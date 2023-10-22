const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true
    },
});

const Time = mongoose.model('Time', timeSchema);

module.exports  = Time;