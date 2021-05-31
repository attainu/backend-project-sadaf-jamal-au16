// import
const express = require('express');
const fileUpload = require('express-fileupload');
const expHbs = require('express-handlebars');
require("dotenv").config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const { getAllRestaurants } = require('./controllers/partnerController');
const partnerRouter = require('./routes/partner');
const loginRouter = require('./routes/login');
const customerRouter = require('./routes/customer');

// creating instance
const app = express();

// middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles : true }));


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

// configure cloidinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

// end points
app.get('/', getAllRestaurants)

// routes
app.use('/partner', partnerRouter);
app.use('/login', loginRouter);
app.use('/customer', customerRouter);

// creating a Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server up and running on port ${port}!`));