const mongoose = require("mongoose");
const schema = mongoose.Schema;

const usersSchema = new schema({
    role: {
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

module.exports = mongoose.model('Users', usersSchema);