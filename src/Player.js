import PlayingField from "./PlayingField.js";
import Hand from "./Hand.js";
export default class Player{
    bet = 0;
    currentHand = 0;
    money = 1000;
    hands = [];
    playingField = 0;
    isSplitted = false;
    constructor(){
        this.playingField = new PlayingField();
        this.hands.push(new Hand());
    }
    makeBet(){
        if(+this.playingField.bet.value != 0 && /^[0-9]+$/.test(this.playingField.bet.value)){
            if((this.money - +this.playingField.bet.value) >= 0) {
                this.hands[this.currentHand].betSum = +this.playingField.bet.value;
                this.money -= this.hands[this.currentHand].betSum;
                this.playingField.money.innerHTML = this.money;
                return new Promise((resolve, reject)=>{
                    resolve(true); 
                    reject(makeBet());
                })
            } else this.playingField.result.innerHTML = 'You have no money';
        } else this.playingField.result.innerHTML = 'Type in correct sum';
    }

    hit(deck){
        let playerCard = deck.pop();
        this.hands[this.currentHand].addCard(playerCard);
        this.hands[this.currentHand].htmlBlock.appendChild(playerCard.ui);
        this.playingField.pointsField.innerHTML = this.hands[this.currentHand].points;
        if(this.hands[this.currentHand].isBust()) {
            this.playingField.result.innerHTML = 'You lost';
            this.playingField.continueButton.classList.toggle('hidden');
        } 
    }
    stand(dealer){
        let selfDeal;
        if(dealer.hand.points < 17) selfDeal = true;
        while(selfDeal){
            let bankCard = dealer.deck.deck.pop();
            dealer.hand.addCard(bankCard);
            dealer.hand.htmlBlock.appendChild(bankCard.ui);
            dealer.pointsField.innerHTML = dealer.hand.points;
            if(dealer.hand.points >= 17) selfDeal = false;
        }
    };

    split(){
      let card = this.hands[this.currentHand].cards.pop();
      this.hands[this.currentHand].points -= card.points;
      this.currentHand++;
      this.hands.push(new Hand());
      this.hands[this.currentHand].betSum = this.hands[this.currentHand-1].betSum;
      this.hands[this.currentHand].addCard(card);
      this.playingField.field.innerHTML = '';
      this.playingField.field.appendChild(this.hands[this.currentHand].htmlBlock);
      console.log(this.hands);
      this.isSplitted = true;
      console.log(this.isSplitted);
    }

    getCurrentHand(){
        return this.currentHand;
    }
    updatePoints(){
        this.playingField.pointsField.innerHTML = this.hands[this.currentHand].points;
    }
}