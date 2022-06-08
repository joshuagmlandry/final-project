//MongoDB Setup

"use strict";

const { MongoClient } = require("mongodb");
const fetch = require('node-fetch');
const { stringify } = require('querystring');

require("dotenv").config();
const { MONGO_URI, SECRET_KEY } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {provinces, placeDescriptions} = require('./data');

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const getProvinceData = (req, res)=>{
  res.status(200).json({
    status: 200,
    data: provinces,
    message: "Province data successfully acquired!"
  });
}

const getParkDescriptions = (req, res)=>{
  res.status(200).json({
    status: 200,
    data: placeDescriptions,
    message: "Park data successfully acquired!"
  });
}

const getAllUserReviews = async (req, res) => {
  try{
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    const postingReview = await db.collection("mock-reviews").find().toArray();
    if(postingReview.length !== 0){
      res.status(200).json({
        status: 200,
        data: postingReview,
        message: "All mock review data successfully acquired!"
      });
    } else {
      res.status(400).json({
        status: 400,
        data: {},
        message: "Mock reviews could not be found"
      });
    }
    client.close();
  } catch(err){
    console.log(err);
  }
}

const getCampsiteReviews = async (req, res)=>{
  try{
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    const query = { "campsite.Unique_Site_ID": req.params.id };
    const reviews = await db.collection("reviews").find(query).toArray();
    if(reviews.length !== 0){
      res.status(200).json({
        status: 200,
        data: reviews,
        message: "Reviews successfully provided"
    });
    } else {
      res.status(400).json({
        status: 400,
        data: [{}],
        message: "No reviews found"
    });
    }
    client.close();
  } catch(err){
    console.log(err);
  }
}

const getUserReviews = async (req, res) => {
  try{
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    const query = { "user": req.params.id };
    const reviews = await db.collection("reviews").find(query).toArray();
    if(reviews.length !== 0){
      res.status(200).json({
        status: 200,
        data: reviews,
        message: "Reviews successfully provided"
    });
    } else {
      res.status(400).json({
        status: 400,
        data: [{}],
        message: "No reviews found"
    });
    }
    client.close();
  } catch(err){
    console.log(err);
  }
}

const deleteReview = async (req, res)=>{
  try{
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    const deleteStatus = await db.collection("reviews").deleteOne({_id: req.body._id});
    if (deleteStatus.deletedCount !== 0){
      res.status(200).json({
        status: 200,
        message: "Review deleted!"
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Review could not be deleted."
      });
    }
    client.close();
  } catch(err){
    console.log(err);
  }
}

const postReview = async (req, res)=>{
  try{

    //CAPTCHA verification

    if(!req.body.captcha){
      return res.status(400).json({
        status: 400,
        message: "Captcha not checked"
      });
    }

    const query = stringify({
      secret: SECRET_KEY,
      response: req.body.captcha,
      remoteip: req.connection.remoteAddress
    });

    const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

    const captchaResponse = await fetch(verifyURL).then(res => res.json());

    if (captchaResponse.success !== undefined && !captchaResponse.success){
      return res.status(400).json({
        status: 400,
        message: "Captcha did not pass verification"
      });
    }

    //MongoDB and posting the review

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

const addFavourite = async (req, res)=>{
  try{ 
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    const newFav = await db.collection("favourites").insertOne(req.body);
    if (newFav.acknowledged){
      res.status(200).json({
        status: 200,
        message: "Favourite added"
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Favourite could not be added"
      });
    }
    client.close();
  } catch(err){
    console.log(err);
  }
}

const getFavourites = async (req, res)=>{
  try{
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    const query = {user: req.params.id };
    const userFavs = await db.collection("favourites").find(query).toArray();
    if(userFavs.length !== 0){
      res.status(200).json({
        status: 200,
        data: userFavs,
        message: "Favourites successfully provided"
    });
    } else {
      res.status(400).json({
        status: 400,
        data: [],
        message: "No favourites found"
    });
    }
    client.close();
  } catch(err){
    console.log(err);
  }
}

const deleteFavourite = async (req, res)=>{
  try{
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("final-project");
    const deleteStatus = await db.collection("favourites").deleteOne({_id: req.body._id});
    if (deleteStatus.deletedCount !== 0){
      res.status(200).json({
        status: 200,
        message: "Favourite deleted!"
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Favourite could not be deleted."
      });
    }
    client.close();
  } catch(err){
    console.log(err);
  }
}

module.exports = {getProvinceData, postReview, deleteReview, getAllUserReviews, getCampsiteReviews, getUserReviews, getParkDescriptions, addFavourite, getFavourites, deleteFavourite};