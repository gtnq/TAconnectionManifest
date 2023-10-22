const mongoose = require('mongoose');

const {Schema} = mongoose;


const scheduleSchema = new mongoose.Schema({
    date: {
        type: Schema.Types.ObjectId,
        ref: 'Date',
        required : true
    },
    time: {
        type: Schema.Types.ObjectId,
        ref: 'Time',
        required : true        
    },
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required : true
    },
    flight: {
        type: Schema.Types.ObjectId,
        ref: 'Flight',
        required : true
    },
    departure: {
        type: Schema.Types.ObjectId,
        ref: 'Time'
    },
    
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports  = Schedule;
