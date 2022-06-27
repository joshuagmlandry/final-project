"use strict";

const express = require("express");
const morgan = require("morgan");

const {
  getProvinceData,
  getParkDescriptions,
  getAllUserReviews,
  getFavourites,
  getCampsiteReviews,
  getUserReviews,
  getOtherUserReviews,
  getUser,
  getOtherUser,
  addUser,
  addFavourite,
  postReview,
  postBio,
  deleteReview,
  deleteFavourite,
} = require("./endpointHandlers");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // Endpoints

  .get("/api/provinces", getProvinceData)

  .get("/api/park-descriptions", getParkDescriptions)

  .get("/api/all-reviews", getAllUserReviews)

  .get("/api/get-favourites/:id", getFavourites)

  .get("/api/campsite-reviews/:id", getCampsiteReviews)

  .get("/api/user-reviews/:id", getUserReviews)

  .get("/api/other-user-reviews/:id", getOtherUserReviews)

  .get("/api/get-user/:id", getUser)

  .get("/api/get-other-user/:id", getOtherUser)

  .post("/api/add-user", addUser)

  .post("/api/add-to-favourites", addFavourite)

  .post("/api/post-review", postReview)

  .patch("/api/post-bio", postBio)

  .delete("/api/delete-review", deleteReview)

  .delete("/api/delete-favourite", deleteFavourite)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
