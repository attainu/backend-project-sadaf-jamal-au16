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
    // creator: {
    //   type: Schema.Types.ObjectId,
    //   ref: "partner",
    //   required: true,
    // }
  });

module.exports = mongoose.model("Item", itemSchema);