import PlayingField from "./PlayingField.js"
export default class Hand {
  cards = []
  isSplitted = true
  points = 0
  betSum = 0
  betted = false
  htmlBlock
  playingField
  constructor() {
    this.playingField = new PlayingField();
}


  addCard(card) {
    this.cards.push(card)
    if (card.value === 'K' || card.value == 'Q' || card.value == 'J') {
      this.points += 10
    } else if (card.value == 'A') {
      if (this.points + 11 > 21) this.points += 1
      else this.points += 11
    } else this.points += +card.value
    this.playingField.htmlBlock.appendChild(card.ui)
  }
  removeCard(card) {
    if (card.value === 'K' || card.value == 'Q' || card.value == 'J') {
      this.points -= 10
    } else if (card.value == 'A') {
      this.points -= 1
    } else this.points -= +card.value
  }
  isBlackJack() {
    if (this.points == 21) {
      return true
    }
  }
  isBust() {
    if (this.points > 21) return true
  }

  doubleDown(player) {
    player.money -= this.betSum
    this.betSum *= 2
  }

  hit(deck) {
    let card = deck.pop()
    this.addCard(card)
    this.playingField.htmlBlock.appendChild(card.ui)
  }

  split(player) {
    const newHand = new Hand()
    const card = this.cards.pop()
    this.removeCard(card)
    player.updatePoints(this)
    newHand.addCard(card)
    newHand.playingField.htmlBlock.appendChild(card.ui)
    player.hands.push(newHand)
    return newHand
  }

  makeBet(bet) {
    this.betSum = bet
  }
}
