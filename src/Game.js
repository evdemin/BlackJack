import Dealer from './Dealer.js'
import Player from './Player.js'
import Hand from './Hand.js'
import Deck from './Deck.js'
import PlayingField from './PlayingField.js'
import Generator from './Generator.js'
import Card from './Card.js'
import fs from 'fs';
import jsdom from 'jsdom'

const JSDOM = jsdom.JSDOM
let game

let html = fs.readFileSync('./src/index.html')
let page = new JSDOM(html)


export default class Game {
  take = document.querySelector('.takeButton')
  cardNumber = document.querySelector('.cards-number')
  submitBet = document.querySelector('.submit-bet')
  standButton = document.querySelector('.standButton')
  result = document.querySelector('.result')
  continueButton = document.querySelector('.continueGame')
  quitButton = document.querySelector('.quitGame')
  splitButton = document.querySelector('.split-button')
  betField = document.querySelector('.bet')
  addPlayer = document.querySelector('.addPlayer')
  startGame = document.querySelector('.startGame')
  doubleButton = document.querySelector('.doubleButton')
  table = document.querySelector('.table')
  playersBlock = document.querySelector('.players')
  newGameButton = document.querySelector('.newGame')
  
  dealer
  deck
  players = []
  newRound = []
  constructor() {
    this.deck = new Deck()
    this.startGame.addEventListener('click', () => {
      this.launch()
    })
    this.addPlayer.addEventListener('click', () => {
      this.newPlayer()
    })
  }
  launch() {
    if (this.hasEnoughPlayers()) {
      this.dealer = new Dealer()
      this.init()
    }
  }
  async init() {
    this.startGame.classList.toggle('hidden')
    this.addPlayer.classList.toggle('hidden')
    this.submitBet.classList.toggle('hidden')
    for (let player of this.players) {
      const bet = await this.getBet(player)
      player.field.messageField.innerHTML = ''
      player.hands[0].makeBet(bet)
      player.updateCash()
    }
    this.submitBet.classList.toggle('hidden')
    this.shuffle()
    this.dealHands()
    this.start()
  }
  newPlayer() {
    let player = new Player()
    this.players.push(player)
    this.playersBlock.appendChild(player.field.getPlayingField())
  }
  dealersTurn() {
    let ifTake = false
    if (this.dealer.hands[0].points < 17) {
      ifTake = true
    }
    while (ifTake) {
      let card = this.deck.getCard()
      this.dealer.hands[0].addCard(card)
      this.dealer.updatePoints(this.dealer.hands[0])
      if (this.dealer.hands[0].points >= 17) {
        ifTake = false
      }
    }
  }
  getBet(player) {
    player.field.messageField.innerHTML = 'Make bet'
    return new Promise((resolve) => {
      const checkBet = () => {
        let bet = 0
        if (+this.betField.value > 0 && /^[0-9]+$/.test(this.betField.value)) {
          if (player.getMoney() - +this.betField.value >= 0) {
            bet = +this.betField.value
            player.money -= bet
            this.submitBet.removeEventListener('click', checkBet)
            return resolve(bet)
          } else {
            player.field.messageField.innerHTML = 'You have no money'
          }
        } else {
          player.field.messageField.innerHTML = 'Type in correct sum'
        }
      }
      this.submitBet.addEventListener('click', checkBet)
    })
  }

  hasEnoughPlayers() {
    return this.players.length >= 1 && this.players.length < 8
  }
  playersNotPlayed() {
    return this.currentPlayer < this.players.length
  }
  getAction(hand, player) {
    return new Promise((resolve) => {
      const hitAction = () => {
        hand.hit(this.deck.deck)
        player.updatePoints(hand)
        if (hand.isBust() || hand.isBlackJack()) {
          this.take.removeEventListener('click', hitAction)
          return resolve(true)
        }
      }
      const continueAction = () => {
        this.continueButton.removeEventListener('click', continueAction)
        return resolve(player)
      }
      const quitAction = () => {
        this.quitButton.removeEventListener('click', quitAction)
        this.continueButton.removeEventListener('click', continueAction)
        return resolve(true)
      }

      const standAction = () => {
        this.take.removeEventListener('click', hitAction)
        this.standButton.removeEventListener('click', standAction)
        this.doubleButton.removeEventListener('click', doubleAction)
        this.splitButton.removeEventListener('click', splitAction)
        return resolve(true)
      }
      const splitAction = async () => {
        if (player.money - hand.betSum >= 0) {
          const newHand = hand.split(player)
          newHand.makeBet(hand.betSum)
          player.money -= newHand.betSum
          player.updateCash()
          player.updatePoints(hand)
          player.updatePoints(newHand)
          player.field.playingField.appendChild(newHand.playingField.htmlBlock)
        } else {
          console.log('You have no money')
        }
      }
      const doubleAction = () => {
        hand.doubleDown(player)
        hand.addCard(this.deck.getCard())
        player.updateCash()
        player.updatePoints(hand)
        this.take.removeEventListener('click', hitAction)
        this.doubleButton.removeEventListener('click', doubleAction)
        this.splitButton.removeEventListener('click', splitAction)
        this.standButton.removeEventListener('click', standAction)
        return resolve(true)
      }
      this.continueButton.addEventListener('click', continueAction)
      this.quitButton.addEventListener('click', quitAction)
      this.splitButton.addEventListener('click', splitAction)
      this.take.addEventListener('click', hitAction)
      this.doubleButton.addEventListener('click', doubleAction)
      this.standButton.addEventListener('click', standAction)
    })
  }
  async nextRound() {
    for (let pl of this.players) {
      console.log(pl)
      const stay = await this.getAction(pl.hands[0], pl)
      if (stay instanceof Player) {
        stay.cleanFields()
        console.log(stay)
        this.newRound.push(stay)
      }
    }
    this.continueButton.classList.toggle('hidden')
    this.quitButton.classList.toggle('hidden')
    this.players = this.newRound
    console.log(this.players)
    this.newRound = []
    this.playersBlock.innerHTML = ''
    for (let player of this.players) {
      this.playersBlock.appendChild(player.field.getPlayingField())
    }
    this.dealer.cleanFields()
    this.dealer.field.fieldBank.innerHTML = ''
    this.dealer.field = new PlayingField()
    this.addPlayer.classList.toggle('hidden')
    this.startGame.classList.toggle('hidden')
  }

  async start() {
    this.doubleButton.classList.toggle('hidden')
    this.take.classList.toggle('hidden')
    this.standButton.classList.toggle('hidden')
    for (let player of this.players) {
      console.log(player)
      player.field.playingField.classList.add('scale-100')
      for (let hand of player.hands) {
        if (!hand.isBlackJack()) {
          if (hand.isSplittable()) {
            this.splitButton.classList.toggle('hidden')
          }
          hand.playingField.htmlBlock.classList.add('scale-150')
          await this.getAction(hand, player)

          hand.playingField.htmlBlock.classList.remove('scale-150')
        }
      }
    }
    this.dealersTurn()
    this.countPoints()
    this.standButton.classList.toggle('hidden')
    this.doubleButton.classList.toggle('hidden')
    this.take.classList.toggle('hidden')
    if (!this.splitButton.classList.contains('hidden')) {
      this.splitButton.classList.toggle('hidden')
    }
    this.continueButton.classList.toggle('hidden')
    this.quitButton.classList.toggle('hidden')
    this.nextRound()
  }

  shuffle() {
    for (let i = 0; i < this.deck.deck.length - 1; i++) {
      let randomIndex = Math.floor(Math.random() * this.deck.deck.length)
      let j = this.deck.deck[randomIndex]
      this.deck.deck[randomIndex] = this.deck.deck[i]
      this.deck.deck[i] = j
    }
    return this.deck.deck
  }

  dealHands() {
    for (let j = 0; j < 2; j++) {
      for (let player of this.players) {
        let card = this.deck.getCard()
        player.hands[0].addCard(card)
        player.field.playingField.appendChild(
          player.hands[0].playingField.htmlBlock,
        )
        player.hands[0].updatePoints()
      }
      let dealerCard = this.deck.getCard()
      this.dealer.hands[0].addCard(dealerCard)
      this.dealer.field.fieldBank.appendChild(
        this.dealer.hands[0].playingField.htmlBlock,
      )
      this.dealer.hands[0].updatePoints()
    }
  }

  countPoints() {
    let dealersHand = this.dealer.hands[0]
    for (let player of this.players) {
      for (let hand of player.hands) {
        if (dealersHand.getHandPoints() <= 21 && hand.getHandPoints() <= 21) {
          if (hand.getHandPoints() == dealersHand.getHandPoints()) {
            hand.setResult('Das Spiel ist unentschieden')
            player.money += hand.getBetSum()
          } else if (hand.isBlackJack()) {
            hand.setResult('Du hast gewonnen')
            player.money += hand.getBetSum() + hand.getBetSum() * 1.5
          } else if (dealersHand.isBlackJack()) {
            hand.setResult('Du hast verloren')
          } else if (dealersHand.getHandPoints() < hand.getHandPoints()) {
            hand.setResult('Du hast gewonmnen')
            player.money += hand.getBetSum() * 2
          } else {
            hand.setResult('Du hast verloren')
          }
        } else {
          if (hand.isBust()) {
            hand.setResult('Du hast verloren')
          } else if (dealersHand.isBust()) {
            hand.setResult('Du hast gewonnen')
            player.money += hand.getBetSum() * 2
          }
        }
        player.updateCash()
      }
    }
  }
}

game = new Game().launch()
module.exports = page
module.exports = Game;