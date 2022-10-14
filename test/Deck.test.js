import chai from "chai";
import chaidom from "chai-dom";
chai.use(chaidom);
import { expect } from "chai";
import Deck from "../src/Deck.js";
import Card from "../src/Card.js";
import jsdom from "jsdom";
const { JSDOM } = jsdom;
const doc = new JSDOM(
	"<!DOCTYPE html><html><head></head><body></body></html>",
	{
		resources: "usable",
	}
);
global.window = doc.window;
global.document = doc.window.document;

let deck = new Deck();
describe("createUI", () => {
	const values = ["A", "K", "J", "Q", 2, 4, 5, 6, 7, 8, 9, 10];
	const suits = [
		"../src/img/spade.svg",
		"../src/img/heart.svg",
		"../src/img/diamond.svg",
		"../src/img/club.svg",
	];
	function testCards(value, suit) {
		let deckCard = new Deck().createUI(value, suit);
		let cardImage = deckCard.querySelector("img");
		it(`should return correct html element`, () => {
			expect(deckCard).to.have.class("mb-10");
			expect(deckCard).to.have.class("w-[150px]");
			expect(deckCard).to.have.class("h-[200px]");
			expect(deckCard).to.have.class("border-solid");
			expect(deckCard).to.have.class("border-2");
			expect(deckCard).to.have.class("rounded-lg");
			expect(deckCard).to.have.class("text-center");
			expect(deckCard).to.contain.html(`${value}`);
			expect(cardImage).to.have.attribute(`src`, `${suit}`);
			expect(cardImage).to.have.attribute(`width`, `100`);
			expect(cardImage).to.have.attribute(`height`, `100`);
		});
	}
	function testGetCard() {
		let card = deck.getCard();
		it("card object should be instance of class Card and contain keys value, suit and ui. Keys must not be empty", () => {
			expect(card).to.be.an.instanceof(Card);
			expect(card).to.have.own.property("value");
			expect(card.value).to.not.equal("");
			expect(card).to.have.own.property("suit");
			expect(card.suit).to.not.equal("");
			expect(card).to.have.own.property("ui");
			expect(card.suit).to.not.equal(null);
		});
	}
	while (deck.deck.length > 0) {
		testGetCard();
	}
	for (let value of values) {
		for (let suit of suits) {
			testCards(value, suit);
		}
	}
});
