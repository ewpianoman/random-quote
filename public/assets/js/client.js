function getRandomQuote() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        const data = JSON.parse(this.responseText);
        const quote = document.getElementById('random-quote');
        const author = document.getElementById('random-quote-author');

        quote.innerText = data.quote;
        author.innerHTML = `&#8212; ${data.author}`;
    }
    xhr.open("GET", "/api/random", true);
    xhr.send();
}