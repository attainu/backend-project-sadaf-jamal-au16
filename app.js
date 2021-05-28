// import
const express = require('express');
const expHbs = require('express-handlebars');
const mongoose = require('mongoose');
require("dotenv").config();
const homeRouter = require('./routes/home')

// creating instance for express
const app = express();

// middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

// setting view engine
app.engine('hbs', expHbs({ extname: 'hbs'}));
app.set('view engine', 'hbs');

// connecting to MongoDB
const db = process.env.DATABASE
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.log(err));

// Routes
app.use('/', homeRouter)

// creating a Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}!`));