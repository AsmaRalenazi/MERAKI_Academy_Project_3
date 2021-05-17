const express = require("express");
const app = express();
const db=require("./db")
const {users,articles}=require("./schema")
const port = 5000;
app.use(express.json());
// const { uuid } = require("uuidv4");

// let articles = [
//   {
//     id: 1,
//     title: "How I learn coding?",
//     description: "Lorem, Quam, mollitia.",
//     author: "Jouza",
//   },
//   {
//     id: 2,
//     title: "Coding Best Practices",
//     description: "Lorem, ipsum dolor sit, Quam, mollitia.",
//     author: "Besslan",
//   },
//   {
//     id: 3,
//     title: "Debugging",
//     description: "Lorem, Quam, mollitia.",
//     author: "Jouza",
//   },
// ];


//getAllArticles
app.get("/articles", (req, res) => {
  res.status(200);
  articles
  .find()
  .then((result)=>{
    res.json(result)
  })
  .catch((err)=>{
    res.send(err);
  })
})

//getArticlesByAuthor
app.get("/articles/search_1", (req, res) => {
  let author = req.query.author;
  articles.find({author}).then((result)=>{
    res.json(result)
  })
  .catch((err)=>{
    res.send(err)
  })

  res.status(200);
});
  

//getAnArticleById
app.get("/articles/:id", (req, res) => {
  let _id = req.body.id;
  articles.find({_id}).populate("firstName")
  .exec()
  .then((result)=>{
    res.json(result)
  })
  .catch((err)=>{
    res.send(err)
  })
  res.status(200);
});

//createNewArticle
app.post("/articles",async (req, res) => {
const {title,description,author}= req.body
let user1;
await users.findOne({author })
    .then((result) => {
      author = result;
      console.log(author);
    })
    .catch((err) => {
      console.log(err);
    });
  const user1 = new users({
    title,
description,
author:author.firstName
});
})

//updateAnArticleById
app.put("/articles/:id", (req, res) => {
  const id = req.body.id;
  let i;
  const found = articles.find({id}).then(
    (result)=>{
      res.json(result)
  })
  .catch((err)=>{
    res.send(err)
  })
  // const {title,description,author}=req.body
  if (found) {
    articles.title = req.body.title;
    articles.description = req.body.description;
    articles.author = req.body.author;
    // set the response status code to 200 (ok)
    res.status(200);
    // sends back a response articles after update

  }
});

//deleteArticleById

app.delete("/articles/:id", (req, res) => {
  const id = req.params.id;
  let i;
  let found = articles.find((elem) => elem.id === Number(id));

  if (found) {
    articles.splice(i, 1);
    let message = {
      success: true,
      message: `Success Delete article with id =>${id}`,
    };
    res.json(message);
  }
});

//deleteArticlesByAuthor
app.delete("/articles", (req, res) => {
  const deleteAuthor = req.body.author;

  const found = articles.filter((elem) => elem.author !== deleteAuthor);

  if (found) {
    articles = found;
    let message = {
      success: true,
      message: `Success delete all the articles for the author => ${req.body.author}`,
    };
    res.json(message);
  }
});



//2.mongoDB
//createNewAuthor
app.post("/users",(req,res) =>{
let {firstName,lastName,age,country,email,password}=req.body
const user=new users (
 req.body
)
user.save().then((result)=>{
  res.json(result)
}).catch((err)=>{
  res.status(201);
})
   
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
