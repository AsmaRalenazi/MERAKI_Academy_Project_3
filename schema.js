const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  country: { type: String },
  email: { type: String },
  password: { type: String },
});

const articlesSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  author: { type: mongoose.Schema.ObjectId, ref: "users" },
  commentss: [{ type: mongoose.Schema.ObjectId, ref: "comment" }],
});

const commentsSchema = new mongoose.Schema({
  comment: { type: String },
  commenter: { type: mongoose.Schema.ObjectId, ref: "users" },
});
const users = mongoose.model("users", usersSchema);
const articles = mongoose.model("articles", articlesSchema);
const comments = mongoose.model("comment", commentsSchema);
module.exports.users = users;
module.exports.articles = articles;
module.exports.comments = comments;
