//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const homeStartingContent = "This is a blog by AbdAlmajeed Al-Awad.";
const aboutContent = "I am a software engineer student in HIAST and I am working on creating new web sites to improve my experience.";
const contactContent = "";
const app = express();
const posts = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get('/', (req, res) => {
  res.render('home', { homePara: homeStartingContent, publishPosts: posts });
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
  newPost = {
    title: req.body.title,
    post: req.body.post
  }
  posts.push(newPost);
  console.log(newPost);
  res.redirect('/');
});


app.get('/posts/:topic', (req, res) => {
  const topic = _.lowerCase(req.params.topic);
  var found = false;
  var i=0;
  var pos =0;
 posts.forEach((post) => {
    if (_.lowerCase(post.title) === _.lowerCase(topic)) {
      found = true;
      pos=i;
    }
    i++;
  });
  if (found) {
    res.render('post', { post : posts[pos] });
    console.log("yes");
  }
  else
    console.log(topic);
});




app.listen(3000, function () {
  console.log("Server started on port 3000");
});
