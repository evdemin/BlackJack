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
    this.points = this.recountPoints(card);
    this.playingField.htmlBlock.appendChild(card.ui)
  }
  recountPoints(card){
    return this.cards.reduce((accumulator, current) =>{
      if((this.points + card.getPoints()) > 21){
        if(current.getValue() === 'A'){
          return accumulator += 1;
        } else {
          return accumulator += current.getPoints();
        }
    } else {
        return accumulator += current.getPoints();
    }
  }, 0)
}
 
  isBlackJack() {
    return this.points == 21
  }
  isBust() {
    return this.points > 21
  }

  doubleDown(player) {
    player.money -= this.getBetSum();
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
    this.points = this.recountPoints(card);
    player.updatePoints(this)
    newHand.addCard(card)
    newHand.playingField.htmlBlock.appendChild(card.ui)
    player.hands.push(newHand)
    return newHand
  }

  makeBet(bet) {
    this.betSum = bet
  }

  getBetSum(){
    return this.betSum;
  }
  getHandPoints(){
    return this.points;
  }
  updatePoints() {
    this.playingField.pointsField.innerHTML = this.points
  }
  isSplittable(){
    return this.cards.length == 2 && this.cards[0].getValue() === this.cards[1].getValue()
  }
  setResult(resultString){
    this.playingField.result.innerHTML = resultString;
  }
}
