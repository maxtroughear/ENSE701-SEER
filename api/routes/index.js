var express = require('express');
var router = express.Router();

const db = require('mongoose').connection;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({
    message: "Hello World",
  });
});

router.get('/mongo', function (req, res, next) {
  db.collection('sample').findOne({}, function (err, doc) {
    if (err) {
      res.status(500).end();
      return;
    }
    res.status(200);
    res.json({
      message: doc.message,
    });
  });
});

module.exports = router;
