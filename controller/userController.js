const path = require('path');
const bcrypt = require('bcrypt');
const userModel = require(path.join(__dirname, '..', 'model', 'user'));
const { isValidEmail } = require(path.join(__dirname, '..', 'util', 'helperFunction'));

// POST /signup

const signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new Error('Email and password required');
        }

        if (!isValidEmail(email)) {
            throw new Error('Invalid email');
        }

        let existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new userModel({
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: 'Signup successful', userData: newUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



module.exports = {
    signup,
}