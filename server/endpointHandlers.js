//MongoDB Setup

"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {provinces} = require('./data');

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const getProvinceData = (req, res)=>{
  res.status(200).json({
    status: 200,
    data: provinces,
    message: "Province data successfully acquired!"
  });
}

const postReview = async (req, res)=>{
  try{
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    const rating = req.body.rating.map((entry, index) => {
      if(entry){
        return index + 1;
      }
    }).filter(value => {
      return value;
    });
    const reviewToPost = {
      _id: req.body._id,
      campsite: req.body.campsite,
      title: req.body.title,
      rating: rating[0],
      review: req.body.review,
      user: req.body.user,
      name: req.body.name,
      time: req.body.time
    };
    const postingReview = await db.collection("reviews").insertOne(reviewToPost);
    if(postingReview.acknowledged){
      res.status(200).json({
        status: 200,
        data: reviewToPost,
        message: "Review successfully posted!"
      });  
    } else {
      res.status(400).json({
        status: 400,
        data: reviewToPost,
        message: "Review could not be posted at this time."
      });
    }
    client.close();
  } catch (err){
    console.log(err);
  }
}

module.exports = {getProvinceData, postReview};