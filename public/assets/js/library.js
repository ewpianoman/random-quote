const target = document.getElementById('quotes-target');
const paginationUls = document.querySelectorAll('.pagination');
const firstPage = document.querySelector('.pagination').children.item(1);
const lastPage = document.querySelector('.pagination').children.item(document.querySelector('.pagination').children.length - 2);

// Register click event for each pagination UL
paginationUls.forEach(item => {
    item.addEventListener('click', event => {
        if (event.target.tagName.toLowerCase() === 'a') {
            let target = event.target.innerText;
            let currentPages = document.querySelectorAll('.pagination .active');
            let referrer = parseInt(currentPages[0].querySelector('.page-link').innerText);

            if (isNaN(parseInt(target))) {
                if (target.toLowerCase() === 'previous' && referrer > 1) {
                    let previousPage = referrer - 1;
                    currentPages[0].classList.remove('active');
                    currentPages[1].classList.remove('active');
                    currentPages[0].previousElementSibling.classList.add('active');
                    currentPages[1].previousElementSibling.classList.add('active');
                    getQuotes(previousPage);
                } else if (target.toLowerCase() === 'next' && referrer < document.querySelectorAll('.pg').length) {
                    let nextPage = referrer + 1;
                    getQuotes(nextPage);
                    currentPages[0].classList.remove('active');
                    currentPages[1].classList.remove('active');
                    currentPages[0].nextElementSibling.classList.add('active');
                    currentPages[1].nextElementSibling.classList.add('active');
                }
            } else {
                target = parseInt(target);
                updateActivePage(event.target)
                getQuotes(target);
            }

            // Add disabled class if 1st page is active, else remove disabled class
            if (firstPage.classList.contains('active')) {
                paginationUls.forEach(item => {
                    item.children.item(0).classList.add('disabled');
                });
            } else {
                paginationUls.forEach(item => {
                   item.children.item(0).classList.remove('disabled');
                });
            }

            // Add disabled class if last page is active, else remove disabled class
            if (lastPage.classList.contains('active')) {
                paginationUls.forEach(item => {
                   item.children.item(document.querySelector('.pagination').children.length - 1).classList.add('disabled');
                });
            } else {
                item.children.item(document.querySelector('.pagination').children.length - 1).classList.remove('disabled');
            }
        }
    })
});

// Get subset of quotes based on current page
function getQuotes(page, offset = 5) {
    fetch('/api')
        .then(response => response.json())
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

function updateActivePage(target) {
    document.querySelectorAll('.pagination .active').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.page-link').forEach(item => {
        if (item.innerText === target.innerText) {
            item.parentElement.classList.add('active');
        }
    });
}