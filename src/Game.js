import Dealer from './Dealer.js'
import Player from './Player.js'
import Hand from './Hand.js'
import Deck from './Deck.js'
import PlayingField from './PlayingField.js'
let cards = document.querySelector('.cards')
let card = document.querySelector('.card')
let take = document.querySelector('.takeButton')
let cardNumber = document.querySelector('.cards-number')
let submitBet = document.querySelector('.submit-bet')
let standButton = document.querySelector('.standButton')
let result = document.querySelector('.result')
let continueButton = document.querySelector('.continue-button')
let splitButton = document.querySelector('.split-button')
let betField = document.querySelector('.bet')
let addPlayer = document.querySelector('.addPlayer')
let startGame = document.querySelector('.startGame')
let doubleButton = document.querySelector('.doubleButton')
let table = document.querySelector('.table')
let playersBlock = document.querySelector('.players')
let game

class Game {
  currentPlayer = 1
  dealer
  deck
  players = []
  constructor() {
    this.deck = new Deck()
    this.deck.createDeck()
  }
  newPlayer() {
    let player = new Player(this.deck)
    this.players.push(player)
    playersBlock.appendChild(player.field.playingField)
    console.log(player)
  }
  dealersTurn() {
    let ifTake = false
    if (this.dealer.hands[0].points < 17) {
      ifTake = true
    }
    while (ifTake) {
      let card = this.deck.deck.pop()
      this.dealer.hands[0].addCard(card)
      this.dealer.updatePoints(this.dealer.hands[0])
      if (this.dealer.hands[0].points >= 17) {
        ifTake = false
      }
    }
  }
  getBet(player) {
    player.field.messageField.innerHTML = "Make bet";
    return new Promise((resolve) => {
      const checkBet = () => {
        let bet = 0
        if (+betField.value > 0 && /^[0-9]+$/.test(betField.value)) {
          if (player.money - +betField.value >= 0) {
            bet = +betField.value
            console.log(player.money)
            player.money -= bet
            console.log(player.money)
            submitBet.removeEventListener('click', checkBet)
            return resolve(bet)
          } else {
            console.log('You have no money')
          }
        } else {
          console.log('correct sum needed')
          player.playingField.result.innerHTML = 'Type in correct sum'
        }
      }
      submitBet.addEventListener('click', checkBet)
    })
  }

  hasEnoughPlayers() {
    return this.players.length >= 2 || this.players.length < 8
  }
  playersNotPlayed() {
    return this.currentPlayer < this.players.length
  }
  getAction(hand, player) {
    return new Promise((resolve) => {
      const hitAction = () => {
        hand.hit(this.deck.deck)
        player.updatePoints(hand)
        if (hand.isBust()) {
          take.removeEventListener('click', hitAction)
          return resolve(true)
        }
      }
      const standAction = () => {
        take.removeEventListener('click', hitAction)
        standButton.removeEventListener('click', standAction)
        doubleButton.removeEventListener('click', doubleAction)
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
          splitButton.removeEventListener('click', splitAction)
        } else{
            console.log('You have no money')
        }
      }
      const doubleAction = () => {
        hand.doubleDown(player)
        hand.addCard(this.deck.deck.pop())
        player.updateCash()
        player.updatePoints(hand)
        take.removeEventListener('click', hitAction)
        doubleButton.removeEventListener('click', doubleAction)
        splitButton.removeEventListener('click', splitAction)
        standButton.removeEventListener('click', standAction)
        return resolve(true)
      }
      splitButton.addEventListener('click', splitAction)
      take.addEventListener('click', hitAction)
      doubleButton.addEventListener('click', doubleAction)
      standButton.addEventListener('click', standAction)
    })
  }
  async start() {
    for (let player of this.players) {
      for (let hand of player.hands) {
        console.log(player.field)
        if (!hand.isBlackJack()) {
            hand.playingField.htmlBlock.classList.add('scale-150')
          await this.getAction(hand, player)
            hand.playingField.htmlBlock.classList.remove('scale-150')
        }
      }
    }
    this.dealersTurn()
    this.countPoints()
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
        let card = this.deck.deck.pop()
        player.hands[0].addCard(card)
        player.field.playingField.appendChild(
          player.hands[0].playingField.htmlBlock,
        )
        player.updatePoints(player.hands[0])
      }
      let dealerCard = this.deck.deck.pop()
      this.dealer.hands[0].addCard(dealerCard)
      this.dealer.field.fieldBank.appendChild(this.dealer.hands[0].playingField.htmlBlock)
      this.dealer.updatePoints(this.dealer.hands[0])
    }
  }

  countPoints() {
    for (let player of this.players) {
      for (let hand of player.hands) {
        console.log(hand.betSum);
        if (this.dealer.hands[0].points <= 21 && hand.points <= 21) {
          if (hand.points == 21 && this.dealer.hands[0].points == 21) {
            hand.playingField.result.innerHTML = 'Das Spiel ist unentschieden'
            player.money += hand.betSum
          } else if (hand.points == 21 && this.dealer.hands[0].points < 21) {
            hand.playingField.result.innerHTML = 'Du hast gewonnen'
            player.money += hand.betSum + hand.betSum * 1.5
          } else if (this.dealer.hands[0].points == 21 && hand.points < 21) {
            hand.playingField.result.innerHTML = 'Du hast verloren'
          } else if (this.dealer.hands[0].points == hand.points) {
            hand.playingField.result.innerHTML = 'Das Spiel ist unentschieden'
            player.money += hand.betSum
          } else if (this.dealer.hands[0].points < hand.points) {
            hand.playingField.result.innerHTML = 'Du hast gewonmnen'
            player.money += hand.betSum * 2
          } else {
            hand.playingField.result.innerHTML = 'Du hast verloren'
          }
        } else {
          if (hand.points > 21) {
            hand.playingField.result.innerHTML = 'Du hast verloren'
          } else if (this.dealer.hands[0].points > 21) {
            hand.playingField.result.innerHTML = 'Du hast gewonnen'
            player.money += hand.betSum * 2
          }
        }
        player.updateCash()
      }
    }
  }
}

continueButton.addEventListener('click', () => {
  game.continueGame()
  continueButton.classList.toggle('hidden')
})

game = new Game()

startGame.addEventListener('click', () => {
  if (game.hasEnoughPlayers()) init()
})

addPlayer.addEventListener('click', () => {
  game.newPlayer()
  console.log(game.players)
})

async function init() {
  game.dealer = new Dealer()
  for (let player of game.players) {
    const bet = await game.getBet(player)
    player.field.messageField.innerHTML = "";
    player.hands[0].makeBet(bet)
    player.updateCash()
  }
  game.shuffle()
  game.dealHands()
  game.start()
}
