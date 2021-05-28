const router = require('express').Router()
const partner = require('../models/customer')

router.get('/signUp', (req, res) => {
    res.render('customerSignUp');
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

// exporting route
module.exports = router;