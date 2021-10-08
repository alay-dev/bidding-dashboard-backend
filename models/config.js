const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
    label:{
        type: String,
        trim:true,
        required:true,
    },
    value:{
        type: Array,
        trim:true,
        required:true,
    }
},{timestamps: true});

module.exports = mongoose.model("Config", configSchema);