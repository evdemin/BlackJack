import PlayingField from './PlayingField.js'
import Hand from './Hand.js'
export default class BasicPlayer{
    money;
    hands = [];

    constructor(Deck){
        this.deck = Deck;
        this.field = new PlayingField()
        this.hands.push(new Hand())
    }
    updatePoints(hand) {
        hand.playingField.pointsField.innerHTML = hand.points
      }
}