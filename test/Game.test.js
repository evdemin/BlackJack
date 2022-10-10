import assert from "assert"
import chai from 'chai'
import chaidom from 'chai-dom'
chai.use(chaidom);
import { use } from "chai";
use(chaidom);
import expect from "chai";
import jsdom from "jsdom";
import { launch } from "puppeteer";
import Game from "../src/Game.js";
import page from "../src/Game.js"
const { JSDOM } = jsdom.JSDOM;
let game;
describe("updateMsg", function() {
  let jsdom;
  let html;
  before(async function() {
    html = fs.readFileSync('../src/index.html')
    jsdom = await new JSDOM(html);
    JSDOM.fromFile("./src/index.html", {
      resources: "usable",
      runScripts: "dangerously"
    });

  global.document = jsdom.window
    await new Promise(resolve =>
      jsdom.window.addEventListener("load", resolve)
    ).then(await import("../src/Game.js"))
  });

  game = new Game()
});