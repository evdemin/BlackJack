import fs from "fs";
import chai from "chai";
import chaidom from "chai-dom";
chai.use(chaidom);
import { expect } from "chai";
import Player from "../src/Player.js";
import Card from "../src/Card.js";
import { JSDOM } from "jsdom";
describe("updateCash()", () => {
	function checkUpdateCash(cash) {
		it("check if player.field.money.innerHTML == player.money", () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;
			let player = new Player();
			player.money = cash;
			player.updateCash();
			expect(player.field.money.innerHTML).to.equal(`${cash}`);
		});
	}
	for (let i = 10; i < 500; i += 10) {
		checkUpdateCash(i);
	}
});

describe("cleanField()", () => {
	it("hands length has to be 1", () => {
		let jsdom;
		let html;
		html = fs.readFileSync("./src/index.html");
		jsdom = new JSDOM(html);

		global.document = jsdom.window.document;
		let player = new Player();
		player.hands[0].addCard(
			new Card("10", null, document.createElement("div"))
		);
		player.cleanFields();
		expect(player.hands.length).to.equal(1);
	});
	it("hand has to be empty", () => {
		let jsdom;
		let html;
		html = fs.readFileSync("./src/index.html");
		jsdom = new JSDOM(html);

		global.document = jsdom.window.document;
		let player = new Player();
		player.hands[0].addCard(
			new Card("10", null, document.createElement("div"))
		);
		player.cleanFields();
		expect(player.hands[0].cards.length).to.equal(0);
	});
});
