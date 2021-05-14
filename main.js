const express = require("express");
const app = express();
const port = 5000;
app.use(express.json());

const articles = [
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
  const newUser=id.title.description.author
  const newArticles =req.body.newUser
  articles.push(newArticles);

  res.status(201);
  res.json(newArticles);
})




//updateAnArticleById
app.put("/articles/:id"),(req,res)=>{

  const updateArticle=req.body.id
  articles.push(updateArticle);
  res.json(updateArticle);

}


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });