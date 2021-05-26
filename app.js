const express = require('express');
// const morgan = require('morgan');
const expHbs = require('express-handlebars');
const app = express();

app.use(express.static('public'))
app.engine('hbs', expHbs({ extname: 'hbs'}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/signUp', (req, res) => {
    res.render('signup');
})

app.listen(3000, () => console.log('server started'));