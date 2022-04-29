const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

// View Setup
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {

    jsonReader('./data/quotes.json', (err, quotes) => {
        if (err) {
            console.log(err);
            return;
        }
        let random = getRandomInt(quotes.length);
        res.render('index', {
            title: 'MOMENTO',
            page: 'Home',
            menuId: 'home',
            rand: random,
            quote: quotes[random]
        })
    });
});

app.get('/api', (req, res) => {

    jsonReader('./data/quotes.json', (err, quotes) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(quotes);
    });
});

app.get('/api/random', (req, res) => {

    jsonReader('./data/quotes.json', (err, quotes) => {
        if (err) {
            console.log(err);
            return;
        }
        let random = getRandomInt(quotes.length);
        res.json(quotes[random]);
    });
});

app.listen(port, (err) => {
    if(err) throw err
    console.log(`App listening on port: ${port}`);
});

// Load jsonReader() Helper Function
function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
        if (err) {
            return cb && cb(err);
        }
        try {
            const object = JSON.parse(fileData);
            return cb && cb(null, object);
        } catch(err) {
            return cb && cb(err);
        }
    });
}

// Random Number Helper Function
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}