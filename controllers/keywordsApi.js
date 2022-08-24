const catchAsync = require("../utils/catchAsync");
const mongoose = require('mongoose');

const DB = 'mongodb+srv://admin:BiddingDashboard123@cluster0.nw9fn.mongodb.net/biddingDash?retryWrites=true&w=majority';
mongoose.connect(DB).then(() => {
  console.log('db connected successfully');
}).catch((err) => console.log(err));

const Keyword = require("../models/keyword");
const Config = require("../models/config");



exports.get_keywords = catchAsync(async (req, res, next) => {
  var keywords;
  Keyword.find({})
        .populate("keywords","score raw_keywords phrases")
        .exec((err, keywords) => {
          Config.find({})
          .exec((err, configs) => {
            res.status(200).json({
              status: "success",
              countries: configs.filter(function(value){
                return value.label === 'countries';
              }),
              keywords: keywords,
              save_searches: configs.filter(function(value){
                return value.label === 'search';
              }),
              hide_projects: configs.filter(function(value){
                return value.label === 'hideProjects';
              }),
            });
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

  Config.updateOne(
    {label: "countries"},
    {$set: {value: req.body.countries}},
    (err, config) => {
    }
  )

  Config.updateOne(
    {label: "search"},
    {$set: {value: req.body.search}},
    (err, config) => {
    }
  )

  Config.updateOne(
    {label: "hideProjects"},
    {$set: {value: req.body.hide_projects}},
    (err, config) => {
    }
  )

  res.status(200).json({
    status: "success",
  });
  next();
});

exports.save_phrases = catchAsync(async (req, res, next) => {
  for (let [score, phrase] of Object.entries(req.body.phrases)) {
    Keyword.updateOne(
      {score: score},
      {$set: {phrases: phrase}},
      (err, keyword) => {
      }
    )
  }

  res.status(200).json({
    status: "success",
  });
  next();
});