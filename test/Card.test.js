import assert from "assert";
import { expect } from "chai";
import Card from "../src/Card.js";
const numericValues = ["2", "4", "5", "6", "7", "8", "9", "10"];
const letterValues = ["A", "K", "J", "Q"];
import fs from "fs";
import { JSDOM } from "jsdom";

let jsdom;
let html;
html = fs.readFileSync("./src/index.html");
jsdom = new JSDOM(html);
global.document = jsdom.window.document;

describe("getPoints()", () => {
	function testPointsNumbers(number) {
		it(`should return ${number} if the value of a card is ${number}`, () => {
			assert.equal(new Card(number).getPoints(), number);
		});
	}

	function testPointsLetters(letter) {
		switch (letter) {
			case "A":
				it(`should return 11 if the value of a card is ${letter}`, () => {
					assert.equal(new Card(letter).getPoints(), 11);
				});
				break;
			case "J":
				it(`should return 10 if the value of a card is ${letter}`, () => {
					assert.equal(new Card(letter).getPoints(), 10);
				});
				break;
			case "Q":
				it(`should return 10 if the value of a card is ${letter}`, () => {
					assert.equal(new Card(letter).getPoints(), 10);
				});
				break;
			case "K":
				it(`should return 10 if the value of a card is ${letter}`, () => {
					assert.equal(new Card(letter).getPoints(), 10);
				});
				break;
		}
	}
	for (let element of numericValues) {
		testPointsNumbers(element);
	}

	for (let element of letterValues) {
		testPointsLetters(element);
	}
});

describe("getValue()", () => {
	let allCardValues = numericValues.concat(letterValues);
	for (let card of allCardValues) {
		it(`has to return ${card}`, () => {
			expect(
				new Card(card, null, document.createElement("div")).getValue()
			).to.equal(card);
		});
	}
});
