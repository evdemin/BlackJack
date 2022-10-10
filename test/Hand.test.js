import assert from "assert"
import chai from 'chai'
import chaidom from 'chai-dom'
chai.use(chaidom);
import { expect } from 'chai'
import Player from '../src/Player.js'
import Card from '../src/Card.js'
import Generator from '../src/Generator.js'
import jsdom from "jsdom";
import Deck from "../src/Deck.js";
import Hand from "../src/Hand.js";
const { JSDOM } = jsdom;
const doc = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
    resources: 'usable'
});
global.window = doc.window;
global.document = doc.window.document;
describe("addCard(card)", () => {
    let hand = new Hand();
    let deck = new Deck();
    function testAddCard(card) {
        hand.addCard(card);

        let children = hand.playingField.htmlBlock.children;
        let child = children[children.length - 1];
        it(`check if htmlBlock ${child.innerHTML} equals ${card.ui.innerHTML}`, () => {

            expect(child).to.equal(card.ui);
        })
    }
    while (deck.deck.length > 0) {

        testAddCard(deck.getCard());
    }
})

describe("recountPoints()", () => {
    function checkRecountPointsWithAces(cards) {
        let hand = new Hand();
        let correctPoints = true;
        for (let card of cards) {
            hand.addCard(card);
        }
        for (let card of hand.cards) {
            if (hand.getHandPoints() > 21 && card.getValue() == 'A' && card.getPoints() == 11) {
                correctPoints = false;
                break;
            }
        }
        it(`check if  hand.points ${hand.getHandPoints()} are correct points`, () => {
            expect(correctPoints).to.equal(true)

        })
    }
    let randomArrays = new Generator().generate();
    for (let arr = 0; arr < randomArrays.length; arr++) {
        checkRecountPointsWithAces(randomArrays[arr]);
    }
})


describe('isBlackJack()',()=>{
    let ifBlackJack = false;
    let hand = new Hand();
    function checkBlackJack(cards){
        for(let card of cards){
            hand.addCard(card);
        }
        if(hand.getHandPoints() == 21){
            ifBlackJack = true;
        }
        it("Check if result of isBlackJack() == ifBlackJack variable", ()=>{
            expect(hand.isBlackJack()).to.equal(ifBlackJack);
        })
    }
    let randomArrays = new Generator().generate();
    for (let arr = 0; arr < randomArrays.length; arr++) {
        checkBlackJack(randomArrays[arr]);
    }
})

describe('hit()', ()=>{
    function checkHit(){
        let hand = new Hand();
        let deck = new Deck();
        let isCard = false;
        let currentCard = 0;
        for(let i = 0; i < 10; i++){
            hand.hit(deck.deck);
            if(hand.cards[currentCard] instanceof Card && hand.cards[currentCard].value != null && hand.cards[currentCard].suit != null && hand.cards[currentCard].ui != null){
                isCard = true;
            }
            currentCard++;
        }
        it("check if card in an array is instance of Card and isn't empty", ()=>{
            expect(isCard).to.equal(true);
        })
    }
    checkHit();
})

describe("split(player)", ()=>{
    function checkSplit(cards){
        let player = new Player();
        let card1 = cards.pop();
        let card2 = cards.pop();
        player.hands[0].addCard(card1);
        player.hands[0].addCard(card2);
        player.hands[0].split(player);

        it("check if new hand contains a card from the splitted hand",()=>{
            expect(player.hands[1].cards[0]).to.equal(card2);
        })
        it("check if length of both hands is 1",()=>{
            expect(player.hands[0].cards.length && player.hands[1].cards.length).to.equal(1);
        })
        it("check if points of the first hand == card points it contains ",()=>{
            expect(player.hands[0].getHandPoints()).to.equal(card1.getPoints());
        })
        it("check if points of the second hand == card points it contains ",()=>{
            expect(player.hands[1].getHandPoints()).to.equal(card2.getPoints());
        })
    }
    let randomArrays = new Generator().generate();
    for (let arr = 0; arr < 50; arr++) {
        checkSplit(randomArrays[arr]);
    }
})