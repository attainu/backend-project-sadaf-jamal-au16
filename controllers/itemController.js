const Item = require("../models/item");
const Partner = require("../models/partner");
const itemsId = require("../routes/partner");
const cloudinary = require('cloudinary').v2;

exports.addItem = async (req, res, next) => {
  const newItem = new Item({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
  });
  await cloudinary.uploader.upload(req.files.itemImage.tempFilePath, async (err, result) => {
    if (err) throw err;
    newItem.imageUrl = result.url;
    newItem.save();
  });
  const partner = await Partner.findById(req.partner._id)

  await partner.items.push(newItem)
  await partner.save()

  const partner1 = await Partner.findById(req.partner._id).populate('items').lean()
  res.render('partnerDashboard', partner1);
};

exports.editItem = async (req, res, next) => {
  let _id = itemsId.itemsId
  try {

    try {

      const ItemData = await Item.findById(_id)

      if (req.body.name != "") {
        updatedTitleName = req.body.name
      }
      else {
        updatedTitleName = ItemData.title
      }
      if (req.body.decription != "") {
        updatedDecription = req.body.decription
      }
      else {
        updatedDecription = ItemData.description
      }
      if (req.body.price != "") {
        updatedPrice = req.body.price
      }
      else {
        updatedPrice = ItemData.price
      }

      const updatedItemData = await Item.findByIdAndUpdate(_id,
        {
          title: updatedTitleName,
          description: updatedDecription,
          price: updatedPrice

        })
      partner = await Partner.findById(req.partner._id).populate('items').lean()
      res.render('partnerDashboard', partner)
    } catch (error) {
      console.log(error)
      res.send("Error")
    }


  } catch (err) {

    console.log(err)
    res.send("Error")
  }
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