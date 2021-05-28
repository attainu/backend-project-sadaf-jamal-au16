const mongoose = require("mongoose");
const schema = mongoose.Schema;

const itemSchema = new schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
        type: Number,
        required: true,
      },
    imageUrl: {
      type: String,
      required: false,
    }
  });

module.exports = mongoose.model("Item", itemSchema);