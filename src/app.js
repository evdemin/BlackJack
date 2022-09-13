import Dealer from './Dealer.js';
import Player from './Player.js';
import Hand from './Hand.js';
let cards = document.querySelector('.cards');
let card = document.querySelector('.card');
let take = document.querySelector('.takeButton');
let cardNumber = document.querySelector('.cards-number');
let submitBet = document.querySelector('.submit-bet');
let standButton = document.querySelector('.standButton');
let result = document.querySelector('.result');
let continueButton = document.querySelector('.continue-button');
let splitButton = document.querySelector('.split-button');
let bet = document.querySelector('.bet');
let deck = [];



class Game{
    player;
    dealer;
    constructor(){
        this.player = new Player();
        this.dealer = new Dealer();
    }
    continueGame(){
        if(this.player.isSplitted){
            this.player.currentHand--;
            this.player.hands.pop();
            this.player.playingField.field.innerHTML = '';
            this.player.playingField.field.appendChild(this.player.hands[this.player.currentHand].htmlBlock);
            this.dealer.hand = new Hand();
            this.dealer.hand.addCard(this.dealer.deck.deck.pop());
            this.dealer.hand.addCard(this.dealer.deck.deck.pop());
            this.dealer.field.innerHTML = '';
            this.dealer.field.appendChild(this.dealer.hand.htmlBlock);
            this.dealer.pointsField.innerHTML = this.dealer.hand.points;
            this.player.playingField.pointsField.innerHTML = this.player.hands[this.player.currentHand].points;
            result.innerHTML = '';
            if(this.player.currentHand == 0) this.player.isSplitted = false;
        } else{
            take.classList.toggle('hidden');
            standButton.classList.toggle('hidden');
            bet.classList.toggle('hidden');
            submitBet.classList.toggle('hidden');
            this.player.hands.pop();
            this.player.hands.push(new Hand());
            this.dealer.points = 0;
            this.player.playingField.field.innerHTML = '';
            this.dealer.hand.cards = [];
            this.dealer.field.innerHTML = '';
            this.dealer.hand = new Hand();
            this.player.playingField.pointsField.innerHTML = '0';
            this.dealer.pointsField.innerHTML = '0';
            result.innerHTML = '';
            }
        } 
    toggleHidden(){
        take.classList.toggle('hidden');
        standButton.classList.toggle('hidden');
    }
    countPoints(){
        if(this.dealer.hand.points == 21){
            result.innerHTML = 'You lost';
        } else if(this.dealer.hand.points > 21){
            result.innerHTML = "You won";
            this.player.money += this.player.hands[this.player.currentHand].betSum * 2;
            this.player.playingField.money.innerHTML = `${this.player.money}`;
        } else if(this.dealer.hand.points > this.player.hands[this.player.currentHand].points){
            result.innerHTML = 'You lost';
        } else if(this.dealer.hand.points < this.player.hands[this.player.currentHand].points){
            result.innerHTML = "You won";
            this.player.money += this.player.hands[this.player.currentHand].betSum * 2;
            this.player.playingField.money.innerHTML = `${this.player.money}`;
        } else if(this.dealer.hand.points == this.player.hands[this.player.currentHand].points){
            result.innerHTML = 'Nobody won';
            this.player.money += this.player.hands[this.player.currentHand].betSum;
        }
        continueButton.classList.toggle('hidden');
    }
}
submitBet.addEventListener("click", ()=>{
     game.player.makeBet()
    .then(()=>{return game.dealer.dealHands(game.player)})
    if(game.player.hands[game.player.currentHand].isBlackJack()){
        result.innerHTML = "You won";
        game.player.money += game.player.hands[game.player.currentHand].betSum * 2;
        game.player.playingField.money.innerHTML = game.player.money;
        message.innerHTML = 'Would you like to continue?';
        continueButton.classList.toggle('hidden');
    } else {
        bet.classList.toggle('hidden');
        submitBet.classList.toggle('hidden');
        take.classList.toggle('hidden');
        standButton.classList.toggle('hidden');
    }
})

standButton.addEventListener("click",() =>{
    game.player.stand(game.dealer);
    game.countPoints();
})

take.addEventListener("click", ()=>{
    game.player.hit(game.dealer.deck.deck);
    game.player.hands[game.player.currentHand].isBust();
})

continueButton.addEventListener("click", () =>{
    game.continueGame();
    continueButton.classList.toggle('hidden');
})

splitButton.addEventListener('click', ()=>{
    game.player.split();
    game.dealer.dealHands(game.player);
})
const game = new Game(new Player());

