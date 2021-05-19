const express = require("express");
const app = express();
const db = require("./db");
const { users, articles, comments } = require("./schema");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config();
const secret = process.env.SECRET;

const port = 5000;
app.use(express.json());

//getAllArticles
app.get("/articles", (req, res) => {
  res.status(200);
  articles
    .find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

//getArticlesByAuthor
app.get("/articles/search_1", (req, res) => {
  let author_id = req.query.author;
  articles
    .find({ author: author_id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });

  res.status(200);
});

//getAnArticleById
app.get("/articles/:id", (req, res) => {
  let _id = req.body.id;
  articles
    .find({ _id })
    .populate("author_id", "author")
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
  res.status(200);
});

//createNewArticle
app.post("/articles", (req, res) => {
  const { title, description, author } = req.body;

  const newArticle = new articles({
    title,
    description,
    author,
  });

  newArticle
    .save()
    .then((result1) => {
      res.json(result1);
    })
    .catch((err) => {
      res.json(err);
    });
});

//updateAnArticleById
app.put("/articles/id", (req, res) => {
  const { _id, title, description } = req.body;
  const found = articles
    .findOneAndUpdate({ _id }, { title, description }, { new: true })

    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

//deleteArticleById

app.delete("/articles/id", (req, res) => {
  const { _id, title, description } = req.body;
  articles
    .deleteOne({ _id }, { title, description })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

//deleteArticlesByAuthor
app.delete("/articles", (req, res) => {
  const { title, description, author } = req.body;
  articles
    .deleteOne({ author }, { title, description })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

//2.mongoDB
//createNewAuthor
app.post("/users", (req, res) => {
  let { firstName, lastName, age, country, email, password } = req.body;
  const user = new users(req.body);
  user
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(201);
    });
});

//login level1
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  await users.findOne({ email }).then( async (result) => {
    if (!result) {
      return res.send({ massage: "The email doesn't exist", status: 404 });
    }
    const payload = { userId: result._id, country: result.country,
      role:{role:'admin',permissions:['MANAGE_USERS', 'CREATE_COMMENTS'] } } 
    const options = {
      expiresIn: "60m",
    };

    console.log(result);
    const token = await jwt.sign(payload, secret, options);
    console.log(result.password);  //should be a hashed password
    await bcrypt.compare(password, result.password, (err, result) => {
      if (result) {
        res.json(token);
      } else {
        return res.send({
          massage: "The password you've entered is incorrect",
          status: 403,
        });
      }
    });
  }).catch((err) => {
    res.send(err);
  });
})

const authentication = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, secret, (err, result) => {
    if (token) {

      next();
    }
    if (err) {
      res.send({ massage: "the token invalid expired", status: "403" });
    }
  });
};

//createNewComment
app.post("/articles/:id/comments",authentication, (req, res) => {
  
  let { comment, commenter } = req.body;
  const id = req.params.id;
  const niceComment = new comments({
    comment,
    commenter,
  });

  niceComment
    .save()
    .then(async (result) => {
      await articles.findOneAndUpdate(
        { _id: id },
        { $push: { commentss: result._id } }
      );
      res.json(result);
    })
    .catch((err) => {
      res.status(201);
    });
    const authorization=(string)=>{
      authentication()
    }
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
