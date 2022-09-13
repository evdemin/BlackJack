import Card from './Card.js';

export default class Deck{
    values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q','J'];
    suits = ["../src/img/spade.svg", "../src/img/heart.svg", "../src/img/diamond.svg", "../src/img/club.svg"];
    deck = [];
    createUI(value, suit){
        let element = document.createElement('div');
        let content = document.createTextNode(value);
        element.appendChild(content);
        element.classList.add('w-[250px]', 'h-[300px]', 'border-solid', 'border-2', 'rounded-lg', 'text-center');
        const suitImage = new Image(100,100);
        suitImage.src = `${suit}`;
        element.appendChild(suitImage);
        return element;
    }
    createDeck(){
        let points = 0;
        for(let i = 0; i < this.values.length; i++){
            for(let j = 0; j < this.suits.length; j++){
                if(this.values[i] == 'K' || this.values[i] == 'Q' || this.values[i] == 'J'){
                    points = 10;
                } else if (this.values[i] == 'A'){
                    points = 11;
                 } else points = +this.values[i];
            this.deck.push(new Card(this.values[i], this.suits[j], points, this.createUI(this.values[i], this.suits[j])));
            }
        }
        return this;
    }
    shuffle(){
        for(let i = 0; i < this.deck.length-1; i++){
            let randomIndex = Math.floor(Math.random() * (this.deck.length));
            let j = this.deck[randomIndex];
            this.deck[randomIndex] = this.deck[i];
            this.deck[i] = j;
        };
        return this.deck;
    }
}