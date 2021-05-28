const router = require('express').Router();

router.post('/add', (req, res) => {
    res.render('partnerDashboard');
});

module.exports = router;