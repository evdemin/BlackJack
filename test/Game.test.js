import assert from "assert";
import fs from "fs";
import { JSDOM } from "jsdom";
import Game from "../src/Game.js";
import Player from "../src/Player.js";
import chai from "chai";
import chaidom from "chai-dom";
chai.use(chaidom);
import { expect } from "chai";
import Dealer from "../src/Dealer.js";
import Card from "../src/Card.js";

describe("FUNCTIONS", () => {
	describe("launch()", () => {
		it("false if no players in the game", () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			expect(game.launch()).to.equal(false);
		});
		it("true because >= 1 Player in the game", () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.newPlayer();
			expect(game.launch()).to.equal(true);
		});
	});
	describe("startGame", () => {
		it("return Promise and the game can be launched", (done) => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.newPlayer();
			let ifPromise = false;
			if (game.startGame.click() instanceof Promise) {
				ifPromise = true;

				expect(ifPromise).to.equal(true);
			}
			done();
		});
	});
	describe("newPlayer()", () => {
		it("adds one player", () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.newPlayer();
			expect(game.players.length).not.to.equal(0);
		});
	});
	describe("dealersTurn()", () => {
		function checkDealersTurn() {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();

			game.shuffle();
			game.dealer = new Dealer();
			let firstCard = game.deck.deck.pop();
			let secondCard = game.deck.deck.pop();
			game.dealer.hands[0].addCard(firstCard);
			game.dealer.hands[0].addCard(secondCard);
			if (game.dealer.hands[0].getHandPoints() < 17) {
				it("has to return true if dealer has <17 points and has to take more cards", () => {
					expect(game.dealersTurn()).to.equal(true);
				});
			} else {
				it("has to return false if dealer >=17 points and doesn't have to take more cards", () => {
					expect(game.dealersTurn()).to.equal(false);
				});
			}
		}
		for (let i = 0; i <= 20; i++) {
			checkDealersTurn();
		}
	});

	describe("getBet(player)", () => {
		function checkGetBetCorrectData(bet) {
			it("correct bet", (done) => {
				let jsdom;
				let html;
				html = fs.readFileSync("./src/index.html");
				jsdom = new JSDOM(html);

				global.document = jsdom.window.document;

				let game = new Game();
				game.newPlayer();
				game.betField.value = bet;
				let result = game.getBet(game.players[0]);
				game.submitBet.click();
				result
					.then((value) => {
						expect(value).to.equal(bet);
						done();
					})
					.catch((err) => done(err || "unexpected error"));
			});
		}

		function checkGetBetNotCorrectData(bet) {
			it("error if not correct sum", (done) => {
				let jsdom;
				let html;
				html = fs.readFileSync("./src/index.html");
				jsdom = new JSDOM(html);

				global.document = jsdom.window.document;

				let game = new Game();
				game.newPlayer();
				const actual = game.getBet(game.players[0]);
				game.betField.value = bet;
				game.submitBet.click();
				actual
					.catch((error) => {
						assert.equal(error, false);
						done();
					})
					.catch((err) => done(err));
			});
		}

		function checkGetBetNoMoney(bet) {
			it("error if not enough money", (done) => {
				let jsdom;
				let html;
				html = fs.readFileSync("./src/index.html");
				jsdom = new JSDOM(html);

				global.document = jsdom.window.document;

				let game = new Game();
				game.newPlayer();
				game.players[0].money = 100;
				const actual = game.getBet(game.players[0]);
				game.betField.value = bet;
				game.submitBet.click();
				actual
					.catch((error) => {
						assert.equal(error, false);
						done();
					})
					.catch((err) => done(err));
			});
		}

		for (let i = 1; i <= 100; i++) {
			checkGetBetCorrectData(i);
		}
		let notCorrectData = [0, "a", "s100", "0100", "00100", "100s"];
		for (let i = 0; i < notCorrectData.length; i++) {
			checkGetBetNotCorrectData(notCorrectData[i]);
		}
		checkGetBetNoMoney(500);
	});

	describe("hasEnoughPlayers()", () => {
		it("true if enough players", () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			const game = new Game();
			game.newPlayer();
			expect(game.hasEnoughPlayers()).to.equal(true);
		});
		it("false if enough players", () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			const game = new Game();
			console.log(game.hasEnoughPlayers());
			expect(game.hasEnoughPlayers()).to.equal(false);
		});
	});
	describe("nextRound()", () => {
		it("if there are any players who decided to continue the game", (done) => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;
			let game = new Game();
			game.newPlayer();
			let result = game.getAction(
				game.players[0].hands[0],
				game.players[0]
			);
			game.continueButton.click();
			result
				.then(() => {
					expect(game.players.length).to.equal(1);
					done();
				})
				.catch((err) => done(err || "unexpected error"));
		});
		it("return an object instance of Player", (done) => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;
			let game = new Game();
			game.newPlayer();
			let result = game.getAction(
				game.players[0].hands[0],
				game.players[0]
			);
			game.continueButton.click();
			result
				.then((value) => {
					let ifPlayer = false;
					ifPlayer = value instanceof Player;
					expect(ifPlayer).to.equal(true);
					done();
				})
				.catch((err) => done(err || "unexpected error"));
		});
		it("continueButton and quitButton have to be hidden", (done) => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;
			let game = new Game();
			game.newPlayer();
			let result = game.getAction(
				game.players[0].hands[0],
				game.players[0]
			);
			game.continueButton.click();
			result
				.then(() => {
					expect(
						game.continueButton.classList.contains("hidden") &&
							game.quitButton.classList.contains("hidden")
					).to.equal(true);
					done();
				})
				.catch((err) => done(err || "unexpected error"));
		});
	});

	describe("init()", () => {
		it("all players' bet has to equal 100", (done) => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.dealer = new Dealer();
			game.newPlayer();
			game.newPlayer();
			let result = game.init();
			game.betField.value = "100";
			game.submitBet.click();
			setTimeout(() => game.submitBet.click(), 500);
			result
				.then((value) => {
					for (let player of game.players) {
						expect(player.hands[0].betSum).to.equal(100);
					}
					done();
				})
				.catch((err) => done(err || "unexpected error"));
		});
		it("2 cards has to be dealt out for each player", () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.dealer = new Dealer();
			game.newPlayer();
			game.newPlayer();
			let result = game.init();
			result.then(() => {
				for (let player of game.players) {
					expect(player.hands[0].cards.length).to.equal(2);
				}
				done();
			});
		});
		it("2 cards has to be dealt out for the dealer", () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.dealer = new Dealer();
			game.newPlayer();
			game.newPlayer();
			let result = game.init();
			result.then(() => {
				expect(game.dealer.hands[0].cards.length).to.equal(2);
				done();
			});
		});
	});

	describe("dealHands()", () => {
		it("each player has to become 2 cards", () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.dealer = new Dealer();
			game.newPlayer();
			game.newPlayer();
			game.dealHands();
			for (let player of game.players) {
				expect(player.hands[0].cards.length).to.equal(2);
			}
		});
	});

	describe("start()", () => {
		it("has to return true if promise", (done) => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.newPlayer();
			let result = game.start();
			let ifPromise = false;
			if (result instanceof Promise) {
				ifPromise = true;
				expect(ifPromise).to.equal(true);
			}
			done();
		});
		it("if hand is splittable, splitButton has to become visible", (done) => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.dealer = new Dealer();
			let player = game.newPlayer();
			player.hands[0].addCard(
				new Card("10", null, document.createElement("div"))
			);
			player.hands[0].addCard(
				new Card("10", null, document.createElement("div"))
			);
			let result = game.start();
			setTimeout(() => game.standButton.click(), 500);

			let isVisible = game.splitButton.classList.contains("hidden");
			result
				.then(() => {
					expect(isVisible).to.equal(false);
					done();
				})
				.catch((err) => done(err || "unexpected error"));
		});
		it("has to remove class scale-500", () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.dealer = new Dealer();
			let player = game.newPlayer();
			player.hands[0].addCard(
				new Card("10", null, document.createElement("div"))
			);
			player.hands[0].addCard(
				new Card("10", null, document.createElement("div"))
			);
			let result = game.start();
			setTimeout(() => game.standButton.click(), 500);
			result
				.then(() => {
					expect(
						game.splitButton.classList.contains("scale-500")
					).to.equal(false);
					done();
				})
				.catch((err) => done(err || "unexpected error"));
		});
	});

	describe("countPoints()", () => {
		it(`Unentschieden if dealer's hand's points(20) == player's hand's points(20)`, () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.dealer = new Dealer();
			game.newPlayer();
			let playersHand = game.players[0].hands[0];
			let dealersHand = game.dealer.hands[0];
			playersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			playersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			dealersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			dealersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			expect(game.countPoints()).to.equal("Unentschieden");
		});
		it(`Gewonnen if a player has blackjack`, () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.dealer = new Dealer();
			game.newPlayer();
			let playersHand = game.players[0].hands[0];
			let dealersHand = game.dealer.hands[0];
			playersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			playersHand.addCard(
				new Card("A", null, document.createElement("div"))
			);
			dealersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			dealersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			expect(game.countPoints()).to.equal("Gewonnen");
		});
		it(`Verloren if player's hand's points(25) is bust`, () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.dealer = new Dealer();
			game.newPlayer();
			let playersHand = game.players[0].hands[0];
			let dealersHand = game.dealer.hands[0];
			playersHand.addCard(
				new Card("5", null, document.createElement("div"))
			);
			playersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			playersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			dealersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			dealersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);

			expect(game.countPoints()).to.equal("Verloren");
		});
		it(`Verloren if the dealer has blackjack`, () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.dealer = new Dealer();
			game.newPlayer();
			let playersHand = game.players[0].hands[0];
			let dealersHand = game.dealer.hands[0];
			playersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			playersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			dealersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			dealersHand.addCard(
				new Card("A", null, document.createElement("div"))
			);

			expect(game.countPoints()).to.equal("Verloren");
		});
		it(`Gewonnen if dealer's hand's points(25) is bust`, () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.dealer = new Dealer();
			game.newPlayer();
			let playersHand = game.players[0].hands[0];
			let dealersHand = game.dealer.hands[0];
			playersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			playersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			dealersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			dealersHand.addCard(
				new Card("5", null, document.createElement("div"))
			);
			dealersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			dealersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);

			expect(game.countPoints()).to.equal("Gewonnen");
		});
		it(`Verloren if dealer's hand's points(20) > player's hand's points(10)`, () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.dealer = new Dealer();
			game.newPlayer();
			let playersHand = game.players[0].hands[0];
			let dealersHand = game.dealer.hands[0];
			playersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			dealersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			dealersHand.addCard(
				new Card("10", null, document.createElement("div"))
			);
			expect(game.countPoints()).to.equal("Verloren");
		});
	});

	it(`Gewonnen if dealer's hand's points(10) < player's hand's points(20)`, () => {
		let jsdom;
		let html;
		html = fs.readFileSync("./src/index.html");
		jsdom = new JSDOM(html);

		global.document = jsdom.window.document;

		let game = new Game();
		game.dealer = new Dealer();
		game.newPlayer();
		let playersHand = game.players[0].hands[0];
		let dealersHand = game.dealer.hands[0];
		dealersHand.addCard(
			new Card("10", null, document.createElement("div"))
		);
		playersHand.addCard(
			new Card("10", null, document.createElement("div"))
		);
		playersHand.addCard(
			new Card("10", null, document.createElement("div"))
		);
		expect(game.countPoints()).to.equal("Gewonnen");
	});
});

describe("BUTTONS MANIPULATIONS", () => {
	describe("newPlayerButton", () => {
		it("return an object instance of Player", () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			let ifPlayer = false;

			let player = game.addPlayer.click();
			if (player instanceof Player) {
				ifPlayer = true;

				expect(ifPlayer).to.equal(true);
			}
		});
	});
	describe("continueAction()", () => {
		it("return object Player", (done) => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.newPlayer();
			let result = game.getAction(
				game.players[0].hands[0],
				game.players[0]
			);
			game.continueButton.click();
			result
				.then((value) => {
					expect(value).to.equal(game.players[0]);
					done();
				})
				.catch((err) => done(err || "unexpected error"));
		});
	});
	describe("getAction()", () => {
		it("true when hit action was produced", (done) => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.newPlayer();
			let result = game.getAction(
				game.players[0].hands[0],
				game.players[0]
			);
			game.take.click();
			game.take.click();
			game.standButton.click();
			result
				.then((value) => {
					expect(value).to.equal(true);
					done();
				})
				.catch((err) => done(err || "unexpected error"));
		});
		it("true when is bust or a blackjack", (done) => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			let player = game.newPlayer();
			let playersHand = player.hands[0];
			let result = game.getAction(
				game.players[0].hands[0],
				game.players[0]
			);
			while (playersHand.getHandPoints() < 21) {
				game.take.click();
			}
			result
				.then((value) => {
					expect(value).to.equal(true);
					done();
				})
				.catch((err) => done(err || "unexpected error"));
		});
	});
	describe("doubleAction()", () => {
		it("true when doubleButton has been clicked", () => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;
			let game = new Game();
			game.newPlayer();
			game.players[0].hands[0].betSum = 100;
			let result = game.getAction(
				game.players[0].hands[0],
				game.players[0]
			);
			game.doubleButton.click();
			result.then((value) => {
				expect(value).to.equal(true);
				done();
			});
		});
	});
	describe("splitAction()", () => {
		it("true if enough money to split a hand", (done) => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.newPlayer();
			game.dealer = new Dealer();
			game.dealHands();
			game.players[0].hands[0].betSum = 100;
			let result = game.getAction(
				game.players[0].hands[0],
				game.players[0]
			);
			game.splitButton.click();
			result
				.then((value) => {
					expect(value).to.equal(true);
					done();
				})
				.catch((err) => done(err || "unexpected error"));
			done();
		});
		it("false if not enough money to split a hand", (done) => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.newPlayer();
			game.dealer = new Dealer();
			game.dealHands();
			game.players[0].hands[0].betSum = 1500;
			let result = game.getAction(
				game.players[0].hands[0],
				game.players[0]
			);
			game.splitButton.click();
			result
				.then((value) => {
					expect(value).to.equal(false);
					done();
				})
				.catch((err) => done(err || "unexpected error"));

			done();
		});
	});
	describe("getAction()", () => {
		it("true when stand action was produced", (done) => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.newPlayer();
			let result = game.getAction(
				game.players[0].hands[0],
				game.players[0]
			);
			game.standButton.click();
			result
				.then((value) => {
					expect(value).to.equal(true);
					done();
				})
				.catch((err) => done(err || "unexpected error"));
		});
	});

	describe("getAction()", () => {
		it("true when quit action was produced", (done) => {
			let jsdom;
			let html;
			html = fs.readFileSync("./src/index.html");
			jsdom = new JSDOM(html);

			global.document = jsdom.window.document;

			let game = new Game();
			game.newPlayer();
			let result = game.getAction(
				game.players[0].hands[0],
				game.players[0]
			);
			game.quitButton.click();
			result
				.then((value) => {
					expect(value).to.equal(true);
					done();
				})
				.catch((err) => done(err || "unexpected error"));
		});
	});
});
