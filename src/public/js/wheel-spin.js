/**
 * @var container the element that will be animated(transform => rotation)
 * @var btn the button element that the user will press to initiate the animation
 * @var arrow the point where is going to be used as a checker to know the prize that the user have won
 * @var tableBody the body of the table use to print the last prizes, it is use in @function printWinnerLive()
 * @var printPrize text that appears each time the transition end telling the user the prize he/she have won
 * 					it situated below the table
 */

let container = document.querySelector(".wheel-container");
let btn = document.getElementById("spin");
let arrow = document.querySelector(".arrow");
let tableBody = document.querySelector(".table-body");
let printPrize = document.getElementById("winner");


/**
 * @var number random number it going to be call in the anonymous arrow function 
 * 				declare inside de addeventlistener transitionend of the @var container
 * @var winnerCounter use to save the number of the winner in the localStorage at the @function saveWinner()
 * 						Also is use at the @function printWinnerLive() to print the same number in the table in real time
 */
let number = Math.ceil(Math.random() * 1000);
let winnerCounter = 0 || (localStorage.length);

/**
 * The value of this variables is going to be set inside the anonymous arrow function 
 * 				declare inside de addeventlistener transitionend of the @var container
 * @var elementClass is going to be pass as a param inside @function getPrize()
 * @var prize is passed as a param inside @function saveWinner()
 */
let elementClass = null;
let prize = null;

/**
 * This function receive the name of the class given to the div that form the wheel
 * so we can know the text inside it wich is the prize of the winner
 * @param {String} elementClass 
 * @returns text content inside the element of the given class
 */
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
/**
 * This function first will compare two strings pass as params
 * In case both are equal then the winner is known as @var luckyWinner because that means that
 * the prize he/she have choose and the one that have get are the same
 * Finally the result is save inside the localStorage as a Json object so when the user reload the page the data can be
 * printed in the table
 * @param {String} luckyPrize the prize choosen by the user
 * @param {String} prize the random prize the user have get at the end of the animation
 */
const saveWinner = (luckyPrize, prize) =>{
	let luckyWinner = false;

	if(luckyPrize == prize){
		luckyWinner = true;
	}

	localStorage.setItem(`winner-${winnerCounter}`, JSON.stringify({luckyPrize, prize, luckyWinner}));
}

/**
 * This function is similar to @function saveWinner() but in this case the data is use to print a row in a table
 * so the user can see in real time the prizes he/she is winning
 * @param {String} luckyPrize 
 * @param {String} prize 
 */
const printWinnerLive = (luckyPrize, prize)=>{
	let row = document.createElement("tr");
	let luckyW = luckyPrize!=prize?`\u274C`:`\u{1F4B0}`;
    row.innerHTML=`<th scope="row">${winnerCounter}</th>
	<td>${luckyPrize}</td>
	<td>${prize}</td>
	<td>${luckyW}</td>`;
    tableBody.appendChild(row);
}

/**
 * This event will evaluate if the inner text of the @var luckyPrize is the default one
 * if it is, the wheel does not spin because choose a prize is mandatory before press the button
 * In case the user have choose a prize the wheel will rotate.
 * @returns null in case the user doesn't choose the prize so the wheel do not rotate
 */
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


/**
 * This event listener will be triggered when the rotation of @var container ends
 * then add one to the @var winnerCounter , and evaluate which HTMLElement is the nearest to the arrow of the spin
 * While the user spin the will less thna 5 times the app will save the result and print it in the table
 * reached that number, the user will get a warn to clear the table
 */
container.addEventListener('transitionend', ()=>{
	winnerCounter++;
	elementClass = document.elementFromPoint(arrow.getBoundingClientRect().x+30, arrow.getBoundingClientRect().y-20).className;
	prize = getPrize(elementClass);
	if(winnerCounter < 5){
		saveWinner(luckyPrize.childNodes[0].innerText, prize);
		printWinnerLive(luckyPrize.childNodes[0].innerText, prize);
		printPrize.innerText= `\u2B50 You have won: ${prize}! \u2B50`;
	}else{
		printPrize.innerText="You have reached the maximum amount of spins, clear prizes please";
	}
})

