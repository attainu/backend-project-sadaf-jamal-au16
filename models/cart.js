const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cartSchema = new schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },
    items: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item"
            },
            quantity: Number,
            name: String,
            price: Number
        }
    ]
});

module.exports = mongoose.model("Cart", cartSchema);