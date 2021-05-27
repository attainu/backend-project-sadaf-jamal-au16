const express = require('express');

const expHbs = require('express-handlebars');

const mongoose = require('mongoose');
const db = require("./config/keys").mongoURI;

const sellerRoutes = require('./routes/sellerDashboard');

const app = express();

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.engine('hbs', expHbs({ extname: 'hbs'}));
app.set('view engine', 'hbs');

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/signUp', (req, res) => {
    res.render('signup');
})

app.use('/seller', sellerRoutes)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));