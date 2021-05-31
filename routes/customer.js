const router = require('express').Router()
const authRouter = require('./auth');
const { getRestaurant } = require('../controllers/partnerController');

router.get('/', (req, res) => {
    res.render('customerSignUp');
})

router.use('/signUp', authRouter)

router.use('/signOut', authRouter)

router.get('/restaurant/:restId', getRestaurant)

// exporting route
module.exports = router;