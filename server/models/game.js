const mongoose = require('mongoose');
const PlayerSchema = require("./player").schema;

const GameSchema = new mongoose.Schema({
    name: {type: String, required: true},
    players: [{
        player: PlayerSchema,
        status: Number
    }]
}, {timestamps: true});

module.exports = mongoose.model('Game', GameSchema);