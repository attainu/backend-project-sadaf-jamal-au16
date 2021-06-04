const router = require('express').Router();
const itemRouter = require('./item');
const authRouter = require('./auth');
const { authenticateUser } = require("../middleware/authMiddleware");
const Partner = require("../models/partner");

router.get('/', (req, res) => {
    res.render('partnerSignUp');
})

router.use('/signUp', authRouter)

router.get('/dashboard', authenticateUser, async (req, res) => {
    const partner = await Partner.findById(req.partner._id)
    res.render('partnerDashboard', partner)
})

router.get('/orders', (req, res) => {
    res.render('partnerOrdersPage')
})

router.use('/item', itemRouter);

router.get('/item', (req, res) => {
    res.render('item')
})

router.use('/signOut', authRouter)

// exporting route
module.exports = router;