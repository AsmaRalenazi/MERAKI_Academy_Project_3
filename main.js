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


const getAllArticles= () =>{
  
  app.get("/articles", (req,res)=>{
    res.status(200);
    res.json(articles);
  });
  
}
getAllArticles()




// const getAnArticleById=()=>{

  app.get("/articles/:id",(req,res)=>{
   const id = req.params.id

   const article = articles.find(elm => elm.id === Number(id))

  res.status(200);
  res.json(article);

  });

// }
// getAnArticleById()





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });