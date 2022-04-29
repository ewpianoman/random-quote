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
    res.render('index', {
        title: 'MOMENTO',
        page: 'Home',
        menuId: 'home'
    })
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