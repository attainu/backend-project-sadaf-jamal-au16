const Cart = require("../models/cart");
const Partner = require("../models/partner");
const Item = require("../models/item")
const partnerId = require("./partnerController")

exports.addToCart = async (req, res, next) => {
    const item = await Item.findById(req.params.itemId)

    let cart = await Cart.findOne({ customerId: req.user._id });

    if(cart) {
        cart.quantity += 1
    }

    const newCart = new Cart({
        customerId: req.user._id, 
        partnerId: partnerId.partnerId,
        itemId:req.params._id,
        quantity: 1,
        name: item.title,
        price: item.price,
        imageUrl: item.imageUrl
             
    });
    newCart.save()

    console.log(newCart)
    
    res.redirect(`/customer/restaurant/${partnerId.partnerId}`)

    // const cart = await Cart.findOne({customerId: req.user._id})
    // console.log(cart)
};
