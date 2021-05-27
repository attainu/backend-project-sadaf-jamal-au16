const router = require('express').Router()
const partner = require('../models/seller')

router.get('/', (req, res) => {
    res.render('partner-register');
})

router.post('/dashboard', (req, res) => {
    console.log(req.body)
    const newRestaurant = new partner({
        restaurantName: req.body.restaurantname,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password,
        confirmPassword: req.body.cnfrmpassword,
        items: []
    })
    console.log(newRestaurant)
    newRestaurant.save()

    res.render('partner-dashboard', newRestaurant);
})

module.exports = router;