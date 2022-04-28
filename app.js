const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

// View Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Random Quote Generator',
        page: 'Home',
        menuId: 'home'
    })
});

app.listen(port, (err) => {
    if(err) throw err
    console.log(`App listening on port: ${port}`);
});