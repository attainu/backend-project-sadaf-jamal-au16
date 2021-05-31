// imports
const router = require('express').Router();
const { login, partnerSignUp, customerSignUp, signOut } = require("../controllers/authController");

router.post('/auth', login);

router.post('/partnerDashboard', partnerSignUp);

router.post('/customerDashboard', customerSignUp);

router.get('/logout', signOut);

// exports
module.exports = router;