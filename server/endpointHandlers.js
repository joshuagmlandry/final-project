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

module.exports = {getProvinceData};