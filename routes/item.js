const router = require('express').Router();
const { addItem } = require("../controllers/itemController");

router.post('/add', addItem);

module.exports = router;