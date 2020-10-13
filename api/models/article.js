const { Schema, model } = require("mongoose");

// the article schema defines the fields an article can have, this will be used when searching the db
const articleSchema = new Schema({
  title: String,
  year: Number,
  author: String,
  category: String,
  summary: String,
});

// the schema must be turned to a model to be used and a collection can be created by mongoose
const Article = model('Article', articleSchema);

module.exports = {
  Article
};
