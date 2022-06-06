const moment = require('moment');
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { mockData } = require('./data');

const batchImport = async () => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    console.log("Successfully connected to MongoDB");
    const db = client.db("final-project");

    const mockDataModified = mockData.map(entry => {
      const newTime = moment(entry.time1 + ", " + entry.time2).format('MMMM Do YYYY, h:mm:ss a');
      return {...entry, "_id": uuidv4(), "time": newTime};
    });

    const importReviews = await db
      .collection("mock-reviews")
      .insertMany(mockDataModified);

    client.close();
    console.log("Disconnecting from MongoDB");
  } catch (err) {
    console.log(err);
  }
};

batchImport();
