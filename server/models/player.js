const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name: {type: String, required: true},
    position: {type: String}
}, {timestamps: true});

module.exports = mongoose.model('Player', PlayerSchema);