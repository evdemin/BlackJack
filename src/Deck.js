import Card from './Card.js'

export default class Deck {
  values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J']
  suits = [
    '../src/img/spade.svg',
    '../src/img/heart.svg',
    '../src/img/diamond.svg',
    '../src/img/club.svg',
  ]
  deck = []
  constructor() {
    for (let i = 0; i < this.values.length; i++) {
      for (let j = 0; j < this.suits.length; j++) {
        this.deck.push(
          new Card(
            this.values[i],
            this.suits[j],
            this.createUI(this.values[i], this.suits[j]),
          ),
        )
      }
    }
  }
  createUI(value, suit) {
    let element = document.createElement('div')
    let content = document.createTextNode(value)
    element.appendChild(content)
    element.classList.add(
      'w-[150px]',
      'h-[200px]',
      'border-solid',
      'border-2',
      'rounded-lg',
      'text-center',
      'mb-10'
    )
    const suitImage = document.createElement("img");
    suitImage.setAttribute("src", `${suit}`);
    suitImage.setAttribute("width","100");
    suitImage.setAttribute("height","100");
    element.appendChild(suitImage)
    return element
  }
  getCard() {
    return this.deck.pop()
  }
}
