export default class Card {
  constructor(value, suit, ui) {
    this.value = value
    this.suit = suit
    this.ui = ui
  }

  getValue() {
    return this.value
  }
}
