const router = require('express').Router();
const itemRouter = require('./item');
const authRouter = require('./auth');
const { authenticateUser } = require("../middleware/authMiddleware");
const Partner = require("../models/partner");
const partner = require('../models/partner');
const Cart = require("../models/cart")
const users = require('../models/users');

router.get('/', (req, res) => {
    res.render('partnerSignUp');
})

router.use('/signUp', authRouter)

router.get('/dashboard', authenticateUser, async (req, res) => {
    
    const partner = await Partner.findById(req.partner._id).populate('items').lean()
    res.render('partnerDashboard', partner)
})
router.get('/orders', authenticateUser, async(req, res) => {
  
    let orders = await Cart.find({partnerId:req.query}).lean()
    console.log(orders)
    res.render('partnerOrdersPage', {orders})
})

router.use('/item', itemRouter);

router.get('/item', (req, res) => {
    res.render('item')
})
router.get('/item/edit', (req, res) => {
    exports.itemsId = req.query
    res.render('edit')
})

router.use('/signOut', authRouter)

router.get("/confirm", async(req,res) => {
    _id = req.query
    let cartData = await Cart.findByIdAndUpdate(_id, 
        {
            status : "Order Accepted"
        })
    
    res.render("confirm")
})
router.get("/cancelOrder", async(req,res) => {
    _id = req.query
    let cartData = await Cart.findByIdAndUpdate(_id, 
        {
            status : "Order Cancelled"
        })
    
    res.render("cancelOrder")
})


// exporting route
module.exports = router;