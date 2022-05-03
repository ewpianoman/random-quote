function getJSON(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = () => {
            if(xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                resolve(data);
            } else {
                reject(Error(xhr.statusText));
            }
        };
        xhr.onerror = () => reject(Error('A network error occurred.'));
        xhr.send();
    });
}

function getRandomQuote() {
    getJSON('/api/random')
        .then((data) => {
            const quote = document.getElementById('random-quote');
            const author = document.getElementById('random-quote-author');

            quote.innerText = data.quote;
            author.innerHTML = `&#8212; ${data.author}`;
        })
        .catch(err => console.log(err));
}