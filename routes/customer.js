const router = require('express').Router()
const authRouter = require('./auth');
const { getRestaurant, getCustomer } = require('../controllers/partnerController');
const { addToCart } = require('../controllers/cartController');
const { authenticateUser } = require("../middleware/authMiddleware");


router.get('/', (req, res) => {
    res.render('customerSignUp');
})

router.use('/signUp', authRouter)

router.use('/signOut', authRouter)

router.get('/restaurant/:restId', authenticateUser, getRestaurant)

router.get('/cart', (req, res) => {
    res.render('cart')
})

router.get('/cart/:itemId', authenticateUser, addToCart)

router.get('/orders', authenticateUser, getCustomer)

// exporting route
module.exports = router;