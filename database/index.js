const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/leetcode');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    recovery: {
        passwordHash: String,
        emailHash: String,
    },
});

const Users = mongoose.model('Users', userSchema);

module.exports = {
    Users,
}
