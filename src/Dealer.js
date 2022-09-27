import BasicPlayer from './BasicPlayer.js'

export default class Dealer extends BasicPlayer{
  cash = 1000
  pointsField = document.querySelector('.bank-points')
  constructor(Deck) {
    super(Deck);
  }

  updatePoints(hand) {
    hand.playingField.pointsField.innerHTML = hand.points
  }
}
