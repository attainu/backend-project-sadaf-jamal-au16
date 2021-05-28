const router = require('express').Router();
const partner = require('../models/partner');
const itemRouter = require('./item');

router.get('/signUp', (req, res) => {
    res.render('partnerSignUp');
})
router.get('/dashboard', (req, res) => {
    res.render('partnerDashboard');
})



router.post('/dashboard', (req, res) => {
    const newPartner = new partner({
        restaurantName: req.body.restaurantname,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
        confirmPassword: req.body.cnfrmpassword,
        items: []
    })
    newPartner.save()
    res.render('partnerDashboard', newPartner);
})

router.use('/item', itemRouter);

// exporting route
module.exports = router;