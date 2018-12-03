const mongoose = require('mongoose');


const LastIDSchema = mongoose.Schema({
		id: Number
});

module.exports = mongoose.model('Lastid', LastIDSchema);
