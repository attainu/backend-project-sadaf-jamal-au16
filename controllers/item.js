const addItem = require("../models/item");

exports.createItem = (req, res, next) => {
    const additem = new Item({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
      });

    item.save();
};