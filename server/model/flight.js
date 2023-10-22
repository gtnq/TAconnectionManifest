const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports  = Flight;