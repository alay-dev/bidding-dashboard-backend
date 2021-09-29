const catchAsync = require("../utils/catchAsync");
const mongoose = require('mongoose');

const DB = 'mongodb+srv://admin:BiddingDashboard123@cluster0.nw9fn.mongodb.net/biddingDash?retryWrites=true&w=majority';
mongoose.connect(DB).then(() => {
  console.log('db connected successfully');
}).catch((err) => console.log(err));

const Keyword = require("../models/keyword");



exports.get_keywords = catchAsync(async (req, res, next) => {
  var keywords;
  Keyword.find({})
        .populate("keywords","score raw_keywords")
        .exec((err, keywords) => {
          res.status(200).json({
            status: "success",
            keywords: keywords,
          });
        });
 
});

exports.save_keywords = catchAsync(async (req, res, next) => {
  req.body.keywords.forEach(key => {
    Keyword.updateOne(
        {score: key.score},
        {$set: {keywords: key.keywords, raw_keywords: key.raw_keywords}},
        (err, keyword) => {
        }
    )
  });
  res.status(200).json({
    status: "success",
  });
  next();
});
