const bcrypt = require('bcrypt');
const saltRounds = 10;
const userModels = require('../models/userModels.js');

module.exports = {
    createUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            // Hash password
            const hashed_password = await bcrypt.hash(password, saltRounds);
            // Format data
            const userData = { username, email, password: hashed_password };
            // Create user
            await userModels.createUser(userData);
            res.sendStatus(201);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}
