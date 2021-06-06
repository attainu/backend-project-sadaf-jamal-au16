const mongoose = require("mongoose");
const schema = mongoose.Schema;

const customerSchema = new schema({
        Name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
});

module.exports = mongoose.model('Customer', customerSchema);