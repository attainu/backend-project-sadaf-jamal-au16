const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const Users = require('../models/users');
const Partner = require('../models/partner');
const cloudinary = require('cloudinary').v2;
const Customer = require('../models/customer');
const router = require('express').Router();
const Restaurants = require('./partnerController');

exports.partnerSignUp = (req, res) => {
    bcrypt.hash(req.body.password, 12, (err, hashedPassword) => {
        if(err) throw err;
        const newUser = new Users({
            role: 'PARTNER',
            email: req.body.email,
            password: hashedPassword,
        });
        newUser.save();

        const newPartner = new Partner({
            restaurantName: req.body.restaurantname,
            email: req.body.email,
            address: req.body.address,
            password: hashedPassword,
            items: []
        });
        cloudinary.uploader.upload(req.files.restaurantImage.tempFilePath, ( err, result) => {
            if (err) throw err; 
            newPartner.imageUrl = result.url;
            newPartner.save();
            // res.render('partnerDashboard', newPartner);
            res.render('login');
            return;
        });
    })
    
}

exports.login = (req, res) => {
    Users.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.status(404).send("No user found.");
        }else{
            bcrypt.compare(req.body.password, user.password, async (err, isMatching) => {
                if(err) throw err;
                if(isMatching == true) { 
                    if(user.role == 'PARTNER') {
                        const partner = await Partner.findOne({ email: req.body.email }).populate('items').lean()
                        
                        console.log('Partner', partner)

                        const token = jwt.sign({ user: user, partner: partner }, process.env.SECRET_KEY, { expiresIn: "2h" });
                        res.cookie('auth', token, { maxAgge: 1000 * 60 * 60 * 2})
                        res.render('partnerDashboard', partner)
                        
                    }else{
                        Customer.findOne({ email: req.body.email }, async (err, customer) => {
                            const restaurants = await Partner.find().lean()
                            const token = jwt.sign({ user: user, customer: customer }, process.env.SECRET_KEY, { expiresIn: "2h" });
                            res.cookie('auth', token)
                            res.render('customerDashboard', { Customer: customer, Restaurants: restaurants })
                            return 
                        })
                    }
                }else{
                    return res.status(401).send("Invalid email/password combination.");
                }
            })
        }      
    })
};

exports.customerSignUp = (req, res) => {
    bcrypt.hash(req.body.password, 12, (err, hashedPassword) => {
        if(err) throw err;
        const newUser = new Users({
            role: 'CUSTOMER',
            email: req.body.email,
            password: hashedPassword,
        });
        newUser.save();      
        const newCustomer = new Customer({
            Name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        newCustomer.save()
        // res.render('customerDashboard', newCustomer)
        res.render('login')
    })
}

exports.signOut = (req, res) => {
    res.cookie('auth', 'deleted')
    res.redirect('/')
}