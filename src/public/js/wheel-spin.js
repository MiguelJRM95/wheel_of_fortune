let container = document.querySelector(".wheel-container");
let btn = document.getElementById("spin");
let arrow = document.querySelector(".arrow");
let tableBody = document.querySelector(".table-body");
let printPrize = document.getElementById("winner");
let number = Math.ceil(Math.random() * 1000);
let winnerCounter = 0;
let elementClass = null;
let prize = null;

const printWinnerLive = (luckyPrize, prize)=>{
	let row = document.createElement("tr");
   	let luckyW = luckyPrize!=prize?`\u274C`:`\u{1F4B0}`;
    row.innerHTML=`<th scope="row">${winnerCounter}</th>
                    <td>${luckyPrize}</td>
                    <td>${prize}</td>
                    <td>${luckyW}</td>`;
    tableBody.appendChild(row);
}

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
		case "wheel-text-small":
			let element = document.querySelector(`.${elementClass}`);
			return element.textContent;
			break;
		default:
			return false;
			break;
	}
}

const saveWinner = (luckyPrize, prize) =>{
	let luckyWinner = false;
	if(luckyPrize == prize){
		luckyWinner = true;
	}
	if(winnerCounter < 3){
		winnerCounter++;
		localStorage.setItem(`winner-${winnerCounter}`, JSON.stringify({luckyPrize, prize, luckyWinner}));
	}
}


btn.onclick = function () {
	// luckyPrize it's declared in the prize_choose.js and linked before this one at winPage so
	// it is not neccesary to declare again
	if(luckyPrize.innerText === "Lucky prize"){
		warning.className="bg-danger nav-link";
        warning.style.width="50%";
        warning.style.textAlign="center";
        warning.style.borderRadius="1em";
        warning.style.margin = "0 auto";
		warning.style.color = "white";
		warning.style.fontWeight = "bold";
		warning.innerText = "You must select a prize before spin the wheel";
		return null;
	}

	container.style.transform = "rotate(" + number + "deg)";
	number += Math.ceil(Math.random() * 1000);
}

container.addEventListener('transitionend', ()=>{
	elementClass = document.elementFromPoint(arrow.getBoundingClientRect().x+30, arrow.getBoundingClientRect().y-20).className;
	prize = getPrize(elementClass);
	saveWinner(luckyPrize.childNodes[0].innerText, prize);
	printWinnerLive(luckyPrize.childNodes[0].innerText, prize);
	printPrize.innerText= `\u2B50 You have won: ${prize}! \u2B50`;
})

