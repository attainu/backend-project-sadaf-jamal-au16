const Partner = require('../models/partner');

exports.getAllRestaurants = async (req, res, next) => {
  const restaurants = await Partner.find()
  res.render('home', { restaurants });
}

exports.getRestaurant = async(req, res, next) => {
  const restaurant = await Partner.findById(req.params.restId)
  res.render('restaurant', restaurant);
}