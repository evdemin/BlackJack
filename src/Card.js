export default class Card {
     constructor(value, suit, points, ui){
     this.value = value;
     this.suit = suit;
     this.points = points;
     this.ui = ui;
    }
    getValue(){
        return this.value;
    }
}