import BasicPlayer from './BasicPlayer.js'

export default class Dealer extends BasicPlayer{
  cash = 1000
  pointsField = document.querySelector('.bank-points')
  constructor() {
    super();
  }

  updatePoints(hand) {
    hand.playingField.pointsField.innerHTML = hand.points
  }
}
