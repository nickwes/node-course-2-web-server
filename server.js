const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} path: ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Error logging');
        }
    });
    next();
});

//app.use((req, res, next) => {
//    res.render('maint.hbs');
//    });
//    

app.use(express.static(__dirname + '/public'));    

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//app.get('/', (req, res) => {
////    res.send('Hello Express');
//res.send({
//    name: 'Nick',
//    likes: [
//        'biking',
//        'hiking'
//    ]
//});
//});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',        
        welcomeMsg: 'Welcome'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About'        
    });
});

app.get('/bad', (req, res) => {
//    res.send('Hello Express');
res.send({
    errorMessage: 'Not found'
});
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
