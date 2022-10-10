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

describe("updateCash()", ()=>{
    function checkUpdateCash(cash){

    let player = new Player();
        player.money = cash;
        player.updateCash();
        it("check if player.field.money.innerHTML == player.money", ()=>{
            expect(player.field.money.innerHTML).to.equal(`${cash}`);
        })
    }
    for(let i = 10; i < 500;i+=10){
            checkUpdateCash(i);
    }
})