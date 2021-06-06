
const Partner = require('../models/partner');

exports.getAllRestaurants = async (req, res, next) => {
  const restaurants = await Partner.find().lean()
  res.render('home', { restaurants });
}

exports.getRestaurant = async (req, res, next) => {
  exports.partnerId = req.params.restId
  const restaurant = await Partner.findById(req.params.restId).populate('items').lean()
  if(req.user !== undefined) {
    if(req.user.role == 'CUSTOMER') {
      res.render('customerRestaurantPage', restaurant)
      return
    }else if(req.user.role == 'PARTNER')   {
      res.render('partnerRestaurantPage', restaurant);
      return
    }
  }
  res.render('restaurant', restaurant)
}
