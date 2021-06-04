const router = require('express').Router();
const partnerRouter = require('./partner');
const customerRouter =require('./customer');

router.get('/', (req, res) => {
    res.render('home');
})

router.get('/login', (req, res) => {
    res.render('login');
})

router.use('/customer', customerRouter);
router.use('/partner', partnerRouter);

module.exports = router;