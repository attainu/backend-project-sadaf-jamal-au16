const router = require('express').Router()
const customer = require('../models/customer')

router.get('/signUp', (req, res) => {
    res.render('customerSignUp');
})

router.post('/dashboard', (req, res) => {
    const newCustomer = new customer({
        Name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.cnfrmpassword
    })
    newCustomer.save()
    res.render('customerDashboard', newCustomer);
})

// exporting route
module.exports = router;