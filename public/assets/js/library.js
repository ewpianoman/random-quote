const target = document.getElementById('quotes-target');

// Get subset of quotes based on current page
function getQuotes(page, offset) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
        // Do something
        const indexStart = (page - 1) * offset;
        const indexEnd = indexStart + offset;
        const quotes = JSON.parse(this.responseText);
        target.innerHTML = '';
        for (let i = indexStart; i < indexEnd; i++) {
            target.innerHTML +=
                `<li class="list-group-item">
                    <figure class="item">
                        <blockquote class="blockquote">
                            <p>&ldquo;${quotes[i].quote}&rdquo;</p>
                        </blockquote>
                        <figcaption class="blockquote-footer">
                            ${quotes[i].author}
                        </figcaption>
                    </figure>
                </li>`
        }
    };
    xhr.open("GET", "/api", true);
    xhr.send();
}