import fs from "fs";
import chai from "chai";
import chaidom from "chai-dom";
chai.use(chaidom);
import { expect } from "chai";
import PlayingField from "../src/PlayingField.js";
import { JSDOM } from "jsdom";

describe("getPointsField()", () => {
	it("has to return span element", () => {
		let jsdom;
		let html;
		html = fs.readFileSync("./src/index.html");
		jsdom = new JSDOM(html);

		global.document = jsdom.window.document;
		let field = new PlayingField();
		expect(field.getPointsField().tagName).to.equal("SPAN");
	});
	it("has to return span element", () => {
		let jsdom;
		let html;
		html = fs.readFileSync("./src/index.html");
		jsdom = new JSDOM(html);

		global.document = jsdom.window.document;
		let field = new PlayingField();
		expect(field.getPlayingField().tagName).to.equal("DIV");
	});
});
