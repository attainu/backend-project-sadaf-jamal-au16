const Partner = require('../models/partner');
const Customer = require('../models/customer');

exports.getAllRestaurants = async (req, res, next) => {
  const restaurants = await Partner.find().lean()
  res.render('home', { restaurants });
}

exports.getRestaurant = async (req, res, next) => {
  const restaurant = await Partner.findById(req.params.restId).populate('items').lean()
  if(req.user !== undefined) {
    if(req.user.role == 'CUSTOMER') {
      const customer = await Customer.findOne({ email: req.user.email }).lean()
      res.render('customerRestaurantPage', { Restaurant: restaurant, Customer: customer })
      return
    }else if(req.user.role == 'PARTNER')   {
      res.render('partnerRestaurantPage', restaurant);
      return
    }
  }
  res.render('restaurant', restaurant)
}

exports.getCustomer = async (req, res, next) => {
  const customer = await Customer.findOne({ email: req.user.email }).lean()
  console.log(customer)
  res.render('customerOrdersPage', customer)
};