const mongoose = require("mongoose");
const schema = mongoose.Schema;

const sellerSchema = new schema({
        restaurantName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        confirmPassword: {
            type: String,
            required: true,
        },
        items: []
});

module.exports = mongoose.model('restaurants', sellerSchema);