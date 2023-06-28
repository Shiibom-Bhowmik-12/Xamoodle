const path = require('path');
const userModel = require(path.join(__dirname, '..', 'model', 'user'));
const profileModel = require(path.join(__dirname, '..', 'model', 'profile'));

// POST /addProfile

const addProfile = async (req, res) => {
    const { name, age, email, phone } = req.body;
    const user = req.user;

    try {
        if (!name || !age || !email || !phone) {
            throw new Error('All fields required');
        }

        let existingProfile = await profileModel.findOne({ user });
        if (existingProfile) {
            throw new Error('Profile already exists');
        }

        const newProfile = new profileModel({
            user,
            name,
            age,
            email,
            phone,
        });
        await newProfile.save();
        res.status(200).json({ statusCode:200, message: 'Profile created successfully', profileData: newProfile });
    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message});
    }

};

// GET /allProfiles

const allProfiles = async (req, res) => {
    try {
        const allProfiles = await profileModel.find();
        res.status(200).json({ statusCode:200, message: 'All profiles', allProfiles });
    } catch (error) {
        res.status(400).json({ statusCode: 400, message: error.message});
    }
};



module.exports = {
    addProfile,
    allProfiles,
}