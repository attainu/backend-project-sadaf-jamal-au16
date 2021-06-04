const router = require('express').Router();
const { addItem, editItem, deleteItem } = require("../controllers/itemController");
const { authenticateUser } = require("../middleware/authMiddleware");

router.post('/add', authenticateUser, addItem);

router.get('/edit/:itemId', authenticateUser, editItem);

router.get('/delete/:itemId', authenticateUser, deleteItem)

module.exports = router;