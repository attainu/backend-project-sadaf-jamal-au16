const Item = require("../models/item");

exports.addItem = async (req, res, next) => {
  console.log(req.body)
    const newItem = new Item({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
      });

   await  newItem.save();

   res.redirect('/partner/dashboard')


};