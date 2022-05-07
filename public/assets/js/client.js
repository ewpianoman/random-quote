function getRandomQuote() {
    fetch('/api/random')
        .then(response => response.json())
        .then(data => {
            const quote = document.getElementById('random-quote');
            const author = document.getElementById('random-quote-author');

            quote.innerText = data.quote;
            author.innerHTML = `&#8212; ${data.author}`;
        })
        .catch(err => console.log(err));
}