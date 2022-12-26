const { default: mongoose, mongo } = require("mongoose");

const statuses = ['in_progress', 'booked','cancelled', 'open', 'closed'];

const ticketSchema = mongoose.Schema({
    status: {
        type: String,
        enum: statuses,
        default: 'open'
    },
    ticketNumber:{
        type : Number,
        unique : true,
        sparse : true,
        min : 1,
        max : 40
    },
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    expectedPickupTime: {
        type: Date
    },
    actualPickupTime: {
        type: Date
    },
    expectedDropTime: {
        type: Date
    },
    actualDropTime: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    airWayBillNumber: {
        type: String,
        unique: true
    },
    processingCharge: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    statics: {
        statuses: statuses
    },
});

module.exports = mongoose.model("Ticket", ticketSchema);