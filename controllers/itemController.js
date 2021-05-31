const Item = require("../models/item");
const cloudinary = require('cloudinary').v2;

exports.addItem = (req, res, next) => {
  console.log(req.files)
  const newItem = new Item({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price
  });
  cloudinary.uploader.upload(req.files.itemImage.tempFilePath, ( err, result) => {
    if (err) throw err; 
    newItem.imageUrl = result.url;
    newItem.save();
    res.render('partnerDashboard');
    return;
  });
  
};