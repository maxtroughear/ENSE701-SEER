const { Schema, model } = require("mongoose");

// the submission schema defines the fields an submission can have, this will be used when searching the db
const submissionSchema = new Schema({
  title: String
});

// the schema must be turned to a model to be used and a collection can be created by mongoose
const Subbed = model('Submitted', submissionSchema);

module.exports = {
  Subbed
};
