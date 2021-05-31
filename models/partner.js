const mongoose = require("mongoose");
const schema = mongoose.Schema;

const partnerSchema = new schema({
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
    imageUrl: [
        {
          type: String,
          required: true,
        },
    ],
    items: []
});

module.exports = mongoose.model('Partner', partnerSchema);