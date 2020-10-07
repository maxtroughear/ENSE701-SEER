const { json } = require('body-parser');
var express = require('express');
const { Article } = require('../models/article');
var router = express.Router();

const db = require('mongoose').connection;

//get request for the text that the user enters into the search bar
router.get('/search', function (req, res) {
  // res.json(db.collection('articles').find({ title: req.query.search_query }));

  // don't modify the request object
  let findQuery = req.query;

  // convert the title string query to a regular expression so that we can effectively do a LIKE query
  if (findQuery.title) {
    findQuery.title = new RegExp(findQuery.title, 'i');
  }

  // check if query parameter date exists. attempt to parse the date range json
  if (findQuery.date) {
    try {
      findQuery.date = JSON.parse(findQuery.date);
    } catch (e) {
      console.error('failed to parse query: ', findQuery);
      console.error(e);
      res.status(400);
      return res.end();
    }
  }

  // using the Article model, find anything in the database that matches the query (can include any fields in the article model)
  Article.find(findQuery, (err, doc) => {
    res.json(doc);
  });
})

//post data for the submissions form into the db
router.post('/submit', function (req, res, next) {
  //check the db to see if the submission is in the declined pile  ***DO LATER AFTER POSTING TO DB IS WORKING***

})

router.post('/debugsubmit', function (req, res) {
  // create a new article using the Article model

  const newArticle = new Article({
    title: req.body.title,
    date: req.body.date
  });

  // save the new article and then when done, send back the created article with its id
  newArticle.save().then((doc) => {
    res.json(doc);
  }).catch((err) => {
    // if something goes wrong, catch the error, log to console and report status code 500
    res.status(500);
    res.end();
    console.log(err);
  });
})

module.exports = router;
