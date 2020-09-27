var express = require('express');
var router = express.Router();

const db = require('mongoose').connection;

//get request for the text that the user enters into the search bar
router.get('/search', function(req, res){
   res.json(db.collection('nameofcollection').find(req.query.search_query));
})

//post data for the submissions form into the db
router.post('/api/submit', function(req, res, next){
//check the db to see if the submission is in the declined pile  ***DO LATER AFTER POSTING TO DB IS WORKING***


})

module.exports = router;