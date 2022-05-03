const target = document.getElementById('quotes-target');
const paginationUls = document.querySelectorAll('.pagination');

// Register click event for each pagination UL
paginationUls.forEach(item => {
    item.addEventListener('click', event => {
        if (event.target.tagName.toLowerCase() === 'a') {
            let page = event.target.innerText;
            if (isNaN(parseInt(page))) {
                console.log(`${page} was clicked.`);
            } else {
                page = parseInt(page);
                document.querySelectorAll('.pagination .active').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelectorAll('.page-link').forEach(item => {
                    if (item.innerText === event.target.innerText) {
                        item.parentElement.classList.add('active');
                    }
                });
                getQuotes(page);
            }
        }
    })
});

// Get subset of quotes based on current page
function getQuotes(page, offset = 5) {
    getJSON('/api')
        .then(data => {
            const indexStart = (page - 1) * offset;
            const indexEnd = indexStart + offset;
            target.innerHTML = '';
            for (let i = indexStart; i < indexEnd; i++) {
                target.innerHTML +=
                    `<li class="list-group-item">
                    <figure class="item">
                        <blockquote class="blockquote">
                            <p>&ldquo;${data[i].quote}&rdquo;</p>
                        </blockquote>
                        <figcaption class="blockquote-footer">
                            ${data[i].author}
                        </figcaption>
                    </figure>
                </li>`
            }
        })
        .catch(err => console.log(err));
}