const express = require("express");
const app = express();
const port = 5000;
app.use(express.json());
const { uuid } = require('uuidv4');

let articles = [
  {
  id: 1,
  title: 'How I learn coding?',
  description:
  'Lorem, Quam, mollitia.',
  author: 'Jouza',
  },
  {
  id: 2,
  title: 'Coding Best Practices',
  description:
  'Lorem, ipsum dolor sit, Quam, mollitia.',
  author: 'Besslan',
  },
  {
  id: 3,
  title: 'Debugging',
  description:
  'Lorem, Quam, mollitia.',
  author: 'Jouza',
  },
  ];


  //getAllArticles
  app.get("/articles", (req,res)=>{
    res.status(200);
    res.json(articles);
  });
  





//getArticlesByAuthor
app.get("/articles/search_1", (req,res)=>{
  const search_1=req.query.author;

  const found= articles.filter((elm)=>elm.author === search_1)

  
  if(found){
    res.status(200);
    res.json(found); 
  }else{
    res.status(404);
    res.json("User not found");
  }
});



//getAnArticleById
  app.get("/articles/:id",(req,res)=>{
   const id = req.params.id

   const article = articles.find(elm => elm.id === Number(id))

  res.status(200);
  res.json(article);

  });



//createNewArticle
app.post("/articles",(req,res)=>{
  
  let article = {
    id: uuid(),
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
  };

articles.push(article)
  res.status(201);
  res.json(article);
})





//updateAnArticleById
app.put("/articles/:id",(req,res)=>{
 const id = req.params.id

 let i;
  const found=articles.find ((elem,index) => {
i=index;
return elem.id === Number(id)
  })
  if (found){
    articles[i].title=req.body.title
    articles[i].description=req.body.description
    articles[i].author=req.body.author
    res.status(200)
    res.json(articles);
  }else{
    res.status(404)
    res.json("not found")
  }

})


//deleteArticleById

app.delete("/articles/:id",(req,res) => {
  const id =req.params.id
let i ;
  let found = articles.find(elem => elem.id === Number(id))


if(found){
  articles.splice(i,1)
  let message ={
    "success":true,
    "message":`Success Delete article with id =>${id}`,
  }
  res.json(message)
}

})


//deleteArticlesByAuthor
app.delete("/articles",(req,res)=>{
const deleteAuthor =req.body.author

const found=articles.filter(elem => elem.author !== deleteAuthor)

if (found){
  articles=found
  let message={
    "success":true,
    "message":`Success delete all the articles for the author => ${req.body.author}`
  }
  res.json(message)
}
});





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });