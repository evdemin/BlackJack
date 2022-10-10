import Card from './Card.js'
export default class  Generator{
   values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J'];
   cardsArray = [];
  
   generate(){
            for(let first = 0; first<this.values.length;first++){
                for(let second =0; second<this.values.length;second++){
                    let cards = [];
                    
                    
                    cards.push(new Card(this.values[first],null,document.createElement('div')));
                    cards.push(new Card(this.values[second],null,document.createElement('div')));
                    this.cardsArray.push(cards);
                }
            }

            for(let first = 0; first<this.values.length;first++){
                for(let second =0; second<this.values.length;second++){
                    for(let third = 0; third<this.values.length; third++){
                    let cards = [];
                    cards.push(new Card(this.values[first],null,document.createElement('div')));
                    cards.push(new Card(this.values[second],null,document.createElement('div')));
                    cards.push(new Card(this.values[third],null,document.createElement('div')));
                    this.cardsArray.push(cards);
                } 
            }
        }
        for(let first = 0; first<this.values.length;first++){
            for(let second =0; second<this.values.length;second++){
                for(let third = 0; third<this.values.length; third++){
                    for(let fourth = 0; fourth<this.values.length; fourth++){
                let cards = [];
                cards.push(new Card(this.values[first],null,document.createElement('div')));
                cards.push(new Card(this.values[second],null,document.createElement('div')));
                cards.push(new Card(this.values[third],null,document.createElement('div')));

                cards.push(new Card(this.values[fourth],null,document.createElement('div')));
                this.cardsArray.push(cards);
            } 
        }
    }
}
    console.log(this.cardsArray);
    return this.cardsArray;
    }
   }
