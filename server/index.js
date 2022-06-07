'use strict';

const express = require('express');
const morgan = require('morgan');

const {getProvinceData, postReview, deleteReview, getAllUserReviews, getCampsiteReviews, getUserReviews, getParkDescriptions, addFavourite, getFavourites} = require('./endpointHandlers');

const PORT = 4000;

express()
  .use(function(req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/', express.static(__dirname + '/'))

// Endpoints
//  .get('/bacon', (req, res) => res.status(200).json('🥓'))

 .get('/api/provinces', getProvinceData)

 .get('/api/get-favourites/:id', getFavourites)

 .get('/api/park-descriptions', getParkDescriptions)

 .get('/api/all-reviews', getAllUserReviews)

 .get('/api/campsite-reviews/:id', getCampsiteReviews)

 .get('/api/user-reviews/:id', getUserReviews)

 .post('/api/post-review', postReview)

 .post('/api/add-to-favourites', addFavourite)

 .delete('/api/delete-review', deleteReview)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));