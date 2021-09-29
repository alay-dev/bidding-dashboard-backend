const mongoose = require("mongoose");

const keywordSchema = new mongoose.Schema({
    score:{
        type: Number,
        trim:true,
        required:true,
    },
    raw_keywords:{
        type: String,
        trim:true,
        required:true,
    },
    keywords: {
        type: Array,
        required:true,  
    }
},{timestamps: true});

module.exports = mongoose.model("Keyword", keywordSchema);