const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');
const { ListCollectionsCursor } = require('mongodb');

const uri = "mongodb+srv://abdojat:qazedfcujm@cluster0.w4z0kmh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const url = "mongodb://localhost:27017/blogDB";
mongoose.connect(uri);

const postSchema = {
  title: {
    type: String,
    required: true
  },
  blogContent: {
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

let myPosts = function () {
  return Post.find({}).then(token => { return token; });
}

let findPost = function (id) {
  return Post.find({ _id: id }).then(token => { return token; });
}


app.get('/', (req, res) => {
  let findingMyPosts = myPosts();
  findingMyPosts.then((result) => {
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
    blogContent: req.body.post
  });
  newPost.save();
  console.log(newPost);
  res.redirect('/');
});


app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  let wantedPost = findPost(id);
  wantedPost.then(result=>{
    res.render('post',{post:result[0]});
  })
});




app.listen(3000, function () {
  console.log("Server started on port 3000");
});
