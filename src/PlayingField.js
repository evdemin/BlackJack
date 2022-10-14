export default class PlayingField {
	result = document.querySelector(".result");
	money = 0;
	bet = document.querySelector(".bet");
	message = document.querySelector(".message");
	bankPoints = document.querySelector(".bank-points");
	fieldBank = document.querySelector(".bank");
	playingField = 0;
	fieldPlayer = 0;
	pointsField = 0;
	constructor() {
		let element = document.createElement("div");
		let message = document.createElement("span");
		let cashField = document.createElement("h1");
		let sum = document.createElement("span");
		let wrapper = document.createElement("div");
		let title = document.createElement("h1");
		let titlePoints = document.createElement("span");
		let resultField = document.createElement("span");
		this.htmlBlock = document.createElement("div");
		element.classList.add("player", "flex", "flex-col", "justify-between");
		message.classList.add("message");
		sum.classList.add("money");
		resultField.classList.add("result", "block");
		titlePoints.classList.add("player-points");
		this.htmlBlock.classList.add("flex");
		cashField.innerHTML = "Your cash: ";
		title.innerHTML = "Points: ";
		cashField.appendChild(sum);
		element.appendChild(message);
		element.appendChild(cashField);
		wrapper.appendChild(title);
		wrapper.appendChild(resultField);
		title.appendChild(titlePoints);
		this.htmlBlock.appendChild(wrapper);
		this.messageField = message;
		this.playingField = element;
		this.money = sum;
		this.pointsField = titlePoints;
		this.result = resultField;
	}
	getPlayingField() {
		return this.playingField;
	}
	getPointsField() {
		return this.pointsField;
	}
}
