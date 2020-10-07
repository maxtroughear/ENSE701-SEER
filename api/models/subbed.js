const { Schema, model } = require("mongoose");

// the submission schema defines the fields an submission can have, this will be used when searching the db
const submissionSchema = new Schema({
author: String,
title: String,
journal: String,
year: String,
volume: String,
number: String,
pages: String,
month: String,
doi: String,
article: String
});

// the schema must be turned to a model to be used and a collection can be created by mongoose
const Subbed = model('Submitted', submissionSchema);

module.exports = {
  Subbed
};
