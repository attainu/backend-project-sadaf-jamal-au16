const mongoose = require("mongoose");
const schema = mongoose.Schema;
const { Item } = require("./item")

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
        }
    ],
    items: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
        }
    ]
});

module.exports = mongoose.model('Partner', partnerSchema);