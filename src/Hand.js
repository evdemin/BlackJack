export default class Hand{
    cards = [];
    value = 0;
    isSplitted = true;
    htmlBlock;
    points = 0;
    betSum = 0;
    constructor(){
        this.htmlBlock = document.createElement('div');
        this.htmlBlock.classList.add('flex');
    }
    addCard(card){
        this.cards.push(card);
        this.points += card.points;
        this.htmlBlock.appendChild(card.ui);
    }

    isBlackJack(){
        if(this.points == 21){
            return true;
        }
    }
    isBust(){
        if(this.points > 21)
           return true;
    }
}