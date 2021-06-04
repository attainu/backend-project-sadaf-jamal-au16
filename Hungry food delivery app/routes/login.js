// imports
const router = require('express').Router();
const authRouter = require('./auth');

router.get('/', (req, res) => {
    res.render('login');
})

router.post('/auth', authRouter);

// exports
module.exports = router;