const Item = require("../models/item");
const Partner = require("../models/partner");
const cloudinary = require('cloudinary').v2;

exports.addItem = async (req, res, next) => {
  const newItem = new Item({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price
  });
  cloudinary.uploader.upload(req.files.itemImage.tempFilePath, async ( err, result) => {
    if (err) throw err; 
    newItem.imageUrl = result.url;
    newItem.save();

    const partner = await Partner.findById(req.partner._id)

    partner.items.push(newItem)
    partner.save()
  });
  const partner = await Partner.findById(req.partner._id).populate('items').lean()
  res.render('partnerDashboard', partner); 
};

exports.editItem = async (req, res, next) => {

};

exports.deleteItem = async (req, res, next) => {
  const itemId = req.params.itemId;

  await Item.findByIdAndRemove(itemId)
  let partner = await Partner.findById(req.partner._id)

  partner.items.pull(itemId);
  partner.save();
  partner = await Partner.findById(req.partner._id).populate('items').lean()
  res.render('partnerDashboard', partner) 
};