import PlayingField from "./PlayingField.js"
export default class Hand {
  cards = []
  isSplitted = true
  points = 0
  betSum = 0
  htmlBlock
  playingField
  constructor() {
    this.playingField = new PlayingField();
}


  addCard(card) {

    this.cards.push(card);
    this.points += card.getPoints();
    this.points = this.recountPoints();
    this.playingField.htmlBlock.appendChild(card.ui)
  }
  recountPoints(){
    let countedPoints = this.points;
      for(let element of this.cards){
        if(countedPoints > 21){
          if(element.getValue()==='A' && element.getPoints() == 11){
          countedPoints -= 10;
          element.setAcePoints(1);
        }
      } 
    }
    return countedPoints;
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
    this.points -= card.getPoints();
    player.updatePoints(this)
    newHand.addCard(card)
    newHand.playingField.htmlBlock.appendChild(card.ui)
    player.hands.push(newHand)
    return newHand
  }
  isSplittable(){
    return this.cards.length == 2 && this.cards[0].getValue() === this.cards[1].getValue()
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
  setResult(resultString){
    this.playingField.result.innerHTML = resultString;
  }
}
