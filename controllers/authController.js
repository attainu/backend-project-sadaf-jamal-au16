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
            res.render('partnerDashboard', newPartner);
            return;
        });
    })
    
}

exports.login = (req, res) => {
    Users.findOne({ email: req.body.email }, (err, user) => {
        if(!user) {
            return res.status(404).send("No user found.");
        }else{
            bcrypt.compare(req.body.password, user.password, (err, isMatching) => {
                if(err) throw err;
                if(isMatching == true) {
                    const token = jwt.sign({ accountId: user._id.toString() }, process.env.SECRET_KEY, { expiresIn: "2h" });
                    
                    if(user.role == 'PARTNER') {
                        Partner.findOne({ email: req.body.email }, (err, partner) => {
                            res.render('partnerDashboard', partner)
                            console.log(token)
                            return 
                        })
                    }else{
                        Customer.findOne({ email: req.body.email }, (err, customer) => {
                            res.render('customerDashboard', customer)
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
        res.render('customerDashboard', newCustomer)
    })
}

exports.signOut = (req, res) => {
    res.render('home')
}