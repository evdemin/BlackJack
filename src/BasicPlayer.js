import PlayingField from "./PlayingField.js";
import Hand from "./Hand.js";
export default class BasicPlayer {
	money;
	hands = [];

	constructor() {
		this.field = new PlayingField();
		this.hands.push(new Hand());
	}
	updatePoints(hand) {
		hand.playingField.pointsField.innerHTML = hand.points;
	}

	cleanFields() {
		this.hands = [];
		let newHand = new Hand();
		this.field = new PlayingField();
		this.hands.push(newHand);
		return true;
	}
}
