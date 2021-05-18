const express = require("express");
const app = express();
const db=require("./db")
const {users,articles,comments}=require("./schema")
const port = 5000;
app.use(express.json());


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
  let author_id = req.query.author;
  articles.find({author:author_id}).then((result)=>{
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
  articles.find({_id}).populate("author_id","author")
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
app.post("/articles", (req, res) => {

const {title,description,author}= req.body

  const newArticle = new articles({
    title,
    description,
    author
});

newArticle
.save()
    .then((result1) => {
      res.json(result1);
    })
    .catch((err) => {
      res.json(err);
    });
})

//updateAnArticleById
app.put("/articles/id", (req, res) => {
  const {_id,title, description} = req.body;
  const found = articles.findOneAndUpdate({_id},
  { title, description},{new:true}
  )

  .then((result) => {
    res.json(result);
  })
  .catch((err) => {
    res.send(err);
  });
  
});

//deleteArticleById

app.delete("/articles/id", (req, res) => {
  const {_id,title, description} = req.body;
  articles
    .deleteOne({ _id }, {title,description })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});


//deleteArticlesByAuthor
app.delete("/articles", (req, res) => {
  const {title, description,author} = req.body;
  articles
    .deleteOne({ author }, {title,description })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
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


//login level1
app.post("/login",(req,res)=>{
  let{email,password}=req.body
  users.findOne({email,password})
    .then((result)=>{
      console.log(result);
      if(result){
        res.status(200)
        res.json("Valid login credentials")
      }else {
        res.status(401)
        res.send("Invalid login credentials") 
    }
  }) 
  })


//createNewComment
app.post("/articles/:id/comments",(req,res)=>{
let {comment,commenter}=req.body
const id=req.params.id
const niceComment =new comments({
  comment,commenter
})

niceComment
.save().then(async(result)=>{
await articles.findOneAndUpdate({_id:id},
{$push:{commentss:result._id}})
  res.json(result)
}).catch((err)=>{
  res.status(201);
})
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
