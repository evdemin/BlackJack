export default class PlayingField{
    standButton = document.querySelector('.standButton');
    result = document.querySelector('.result');
    money = 0;
    bet = document.querySelector('.bet');
    submitBet = document.querySelector('.submit-bet');
    continueButton = document.querySelector('.continue-button');
    message = document.querySelector('.message');
    playingField = 0;
    fieldPlayer = 0;
    pointsField = 0;
    bankPoints = document.querySelector('.bank-points');
    fieldBank = document.querySelector('.bank');
   constructor(){
    let message = document.createElement('span');
    message.classList.add('message');
    let element = document.createElement('div');
    let cashField = document.createElement('h1');
    cashField.innerHTML = 'Your cash: ';
    let sum = document.createElement('span');
    sum.classList.add('money');
    cashField.appendChild(sum);
    element.classList.add('player', 'flex', 'flex-col', 'justify-between');
    element.appendChild(message);
    element.appendChild(cashField);
    this.messageField = message;
    this.playingField = element;
    this.money = sum;
    this.htmlBlock = document.createElement('div')
    let wrapper = document.createElement('div');
    let title = document.createElement('h1');
    let titlePoints = document.createElement('span');
    let resultField = document.createElement('span');
    resultField.classList.add('result','block');
    titlePoints.classList.add('player-points');
    title.innerHTML = "Points: ";
    title.appendChild(titlePoints);
    this.pointsField = titlePoints;
    this.result = resultField;
    this.htmlBlock.classList.add('flex')
    wrapper.appendChild(title);
    wrapper.appendChild(resultField);
    this.htmlBlock.appendChild(wrapper);
   }
}