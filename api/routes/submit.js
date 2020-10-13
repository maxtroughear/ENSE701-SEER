var express = require('express');
const { Subb } = require('../models/subbed');
var router = express.Router();

const db = require('mongoose').connection;

//get request for the text that the user enters into the search bar
router.get('/submit', function (req, res) {
  // res.json(db.collection('articles').find({ title: req.query.search_query }));

  // don't modify the request object
  let findQuery = req.query;

  // convert the title string query to a regular expression so that we can effectively do a LIKE query
  if (req.query.title) {
    findQuery.title = new RegExp(req.query.title, 'i');
  }

  // using the Article model, find anything in the database that matches the query (can include any fields in the article model)
  Article.find(findQuery, (err, doc) => {
    res.json(doc);
  });
})

router.post('/submit', function (req, res) {
  // create a new article using the Article model
  const newArticle = new Subb({
    ...req.body
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
