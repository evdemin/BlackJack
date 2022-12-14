export default class Card {
	constructor(value, suit, ui) {
		this.value = value;
		this.suit = suit;
		this.ui = ui;
	}
	setAcePoints(point) {
		this.value = point;
	}
	getValue() {
		return this.value;
	}
	getPoints() {
		if (this.value == "K" || this.value == "Q" || this.value == "J") {
			return 10;
		} else if (this.value === "A") {
			return 11;
		} else {
			return parseInt(this.value, 10);
		}
	}
}
