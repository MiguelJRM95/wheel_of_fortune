let container = document.querySelector(".wheel-container");
let btn = document.getElementById("spin");
let arrow = document.querySelector(".arrow");
let number = Math.ceil(Math.random() * 1000);
let elementClass = null;

const getPrize = (elementClass) => {
	switch (elementClass) {
		case "one":
		case "two":
		case "three":
		case "four":
		case "five":
		case "six":
		case "seven":
		case "eight":
		case "wheel-text":
			let element = document.querySelector(`.${elementClass}`);
			return element.textContent;
			break;
		default:
			return false;
			break;
	}
}


btn.onclick = function () {
	container.style.transform = "rotate(" + number + "deg)";
	number += Math.ceil(Math.random() * 1000);
}

container.addEventListener('transitionend', ()=>{
	elementClass = document.elementFromPoint(arrow.getBoundingClientRect().x+30, arrow.getBoundingClientRect().y-20).className;
	console.log(getPrize(elementClass));
})

