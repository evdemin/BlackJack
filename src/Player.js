import BasicPlayer from './BasicPlayer.js'

export default class Player extends BasicPlayer{
  money = 1000
  playingField = 0
  constructor() {
    super();
    this.field.money.innerHTML = this.money
  }

  updateCash() {
    this.field.money.innerHTML = this.money
  }

  getMoney(){
    return this.money;
  }
}
