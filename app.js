const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');
const { ListCollectionsCursor } = require('mongodb');

const articleRoute = "https://threebdojapi.onrender.com/articles"

const postSchema = {
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
};

const Post = mongoose.model('Post', postSchema);

const homeStartingContent = "This is a blog by AbdAlmajeed Al-Awad.";
const aboutContent = "I am a software engineer student in HIAST and I am working on creating new web sites to improve my experience.";
const contactContent = "";
const app = express();
const posts = [];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

function encodeFormData(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

let findPost = function (id) {
  return Post.find({ _id: id }).then(token => { return token; });
}

app.get('/', (req, res) => {
  fetch(articleRoute)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      res.render('home', { homePara: homeStartingContent, publishPosts: result });
    });
});

app.get('/about', (req, res) => {
  res.render('about', { aboutPara: aboutContent });
});

app.get('/contact', (req, res) => {
  res.render('contact', { contactPara: contactContent });
});


app.get('/compose', (req, res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.post
  });
  //newPost.save();
  console.log(newPost);
  fetch(articleRoute, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
       },
    body: encodeFormData({
      title: req.body.title,
      content: req.body.post}
    )
  })  
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response;
    })
    .then(data => {
      console.log('Success:', data);
      res.redirect('/');
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
});


app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  fetch(articleRoute + "/" + id)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      res.render('post', { post: result });
    });
});




app.listen(3000, function () {
  console.log("Server started on port 3000");
});
