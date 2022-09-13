import Deck from "./Deck.js";
import Hand from "./Hand.js";
import PlayingField from "./PlayingField.js";

let splitButton = document.querySelector('.split-button');
export default class Dealer{
    bet = 0;
    cash = 1000;
    hand;
    points = 0;
    deck;
    field = document.querySelector('.bank');
    pointsField = document.querySelector('.bank-points');
    constructor(){
        this.hand = new Hand();
        this.deck = new Deck();
        this.field = new PlayingField().bankField;
        this.deck.createDeck().shuffle();
    }
    getHands(){

    };
    removeHands(){
        
    }
    updatePoints(){
        this.pointsField.innerHTML = this.points;
    }
    dealHands(player){
        let current = player.getCurrentHand();
        if(player.isSplitted){
            while(current >=0){
            let card = this.deck.deck.pop();
            player.hands[current].addCard(card);
            current--;
        }
        player.playingField.field.appendChild(player.hands[player.currentHand].htmlBlock);
        } else {
            for(let j = 0; j < 2; j++){
                let card = this.deck.deck.pop();
                console.log(player.hands[player.currentHand]);
                player.hands[player.currentHand].addCard(card);
                player.updatePoints();
                let dealersCard = this.deck.deck.pop();
                this.hand.addCard(dealersCard);
                this.points += dealersCard.points;
                this.field.appendChild(this.hand.htmlBlock);
            }
            player.playingField.field.appendChild(player.hands[player.currentHand].htmlBlock);
        }
        player.updatePoints();
        this.updatePoints();
      /*  if(player.hands[player.currentHand].cards[0].getValue() == player.hands[player.currentHand].cards[1].getValue()){
            splitButton.classList.toggle('hidden');
        }*/
    }
}