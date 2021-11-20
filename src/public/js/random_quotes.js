/**
 * Paragraph in which the random quote will be inserted
 */
let quoteP = document.getElementById("quoteP");

/**
 * Default url to get the quotes feched by the backend
 * This will need to be edit in case other port is choosen
 */
const url = "http://localhost:3000/quotes";

/**
 * @var quotes will save all the quotes fetched
 */
const quotes = await fetch(url)
.then(res => res.json())
.then(res => res.data)
.catch(err => console.log('Error: %s', err));

/**
 * This function will return a random int between two numbers
 * In this case 0 and the lenght of the json object of quotes fetched
 * @param {int} min 
 * @param {int} max 
 * @returns a random number between min and max
 */
const randomInt = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Number of random quotes
 */
const quotesNumber = quotes.length;

/**
 *
 * @param {int} num 
 * @param {array} quotes 
 * @returns the quote that is in the num position inside the json array of quotes
 */
const randomQuote = (num, quotes) => {
    return quotes[num].data.quote;
}

/**
 * Print inside the paragraph the random quote obtained
 */
quoteP.innerHTML = `\"${randomQuote(randomInt(0, quotesNumber-1), quotes)}\"`;
