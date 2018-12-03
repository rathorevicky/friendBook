const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    id: Number,
    name : String,
    picture : String,
    dob : Number,
    mobile : Number,
    email : String,
    password : String,
    friends : [Number],
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UsersSchema);

/*
const LastIDSchema = mongoose.Schema({
		lastid: Number
});

module.exports = mongoose.model('LastId', LastIDSchema);*/
