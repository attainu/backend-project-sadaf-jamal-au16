const router = require('express').Router()
const authRouter = require('./auth');
const { getRestaurant } = require('../controllers/partnerController');
const { addToCart } = require('../controllers/cartController');
const { authenticateUser } = require("../middleware/authMiddleware");
const Cart = require("../models/cart")
const Customer = require("../models/customer");
const users = require('../models/users');



router.get('/', (req, res) => {
    res.render('customerSignUp');
})

router.use('/signUp', authRouter)

router.use('/signOut', authRouter)

router.get('/restaurant/:restId', authenticateUser, getRestaurant)

router.get('/cart', authenticateUser, async(req, res) => {
    let email = req.user.email
    const customer = await users.findOne({email})
    let _id = customer._id
    let cartItems = await Cart.find({customerId:_id}).lean()
    console.log(cartItems)

    let initialAmount = 0
    for(var i = 0; i < cartItems.length; i++) {
        initialAmount += (cartItems[i].quantity * cartItems[i].price)

    }

    // console.log(initialAmount)
    const totalAmount = {
        initialAmount: initialAmount,
        deliveryCharge: 40,
        grandTotal: initialAmount + 40
    }

    // console.log(cartItems)
    res.render("cart", { cartItems, totalAmount })
})

router.get('/cart/:itemId', authenticateUser, addToCart)

router.get('/orders', (req, res) => {
    res.render('orders')
})

// exporting route
module.exports = router;