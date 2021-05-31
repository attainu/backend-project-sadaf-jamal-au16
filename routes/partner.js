const router = require('express').Router();
const itemRouter = require('./item');
const authRouter = require('./auth');

router.get('/', (req, res) => {
    res.render('partnerSignUp');
})

router.use('/signUp', authRouter)

router.use('/item', itemRouter);

router.use('/signOut', authRouter)

// exporting route
module.exports = router;