const { model, Schema } = require('mongoose');
const { exchanges } = require('../utils/common-enums');

const companySchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    sic: {
        type: String,
        lowercase: true
    },
    ticker: {
        type: String,
        required: true,
        lowercase: true
    },
    cik: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    exchange: {
        type: String,
        enum: exchanges,
        required: false,
        lowercase: true
    },
    state: String,
    address: String,
});

companySchema.index({
    ticker: 1,
    exchange: 1,
    sic: 1
}, { unique: true })

module.exports = model('Company', companySchema);