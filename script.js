// Get Quotes From APi

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// show new Quotes
function newQuote() {
  loading();
  setTimeout(() => {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    quote.text.length > 120
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");
    quoteText.textContent = quote.text;
    authorText.textContent = quote.author ?? "unknown";
    complete();
  }, 1000);
}

async function getQuotes() {
  loading();
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.error(error);
    // handle error here
  }
}

function handleNewTweet() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, "_blank");
}

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// on Load
getQuotes();

//event listeners
newQuoteBtn.addEventListener("click", () => newQuote());
twitterBtn.addEventListener("click", () => handleNewTweet());
