let quoteP = document.getElementById("quoteP");

const url = "http://localhost:3000/quotes";

const quotes = await fetch(url)
.then(res => res.json())
.then(res => res.data)
.catch(err => console.log('Error: %s', err));

const randomInt = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const quotesNumber = quotes.length;

const randomQuote = (num, quotes) => {
    return quotes[num].data.quote;
}

quoteP.innerHTML = `\"${randomQuote(randomInt(0, quotesNumber-1), quotes)}\"`;
