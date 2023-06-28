const mongoose = require('mongoose');
const { Schema } = mongoose;
const userModel = require('./user');

const profileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String },
    phone: { type: String },
},
  { timestamps: true }
);

const profileModel = mongoose.model('Profile', profileSchema);

module.exports = profileModel;