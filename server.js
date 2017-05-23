const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now} :${req.method}${req.url}`;
  console.log(log);
  fs.appendFile('info.log',log + '\n',(err) => {
    if(err)
    {
      console.log(err);
    }
  });
next();
});

// app.use((req,res,next) => {
//   res.render('maintain.hbs');
// });
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',() => {

  return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text) => {
return text.toUpperCase();
});
app.get('/',(request,response) => {
  //response.send('<h1>hello express</h1>');
  response.send({
    name:'vineeth',
    likes:[
      'biking',
      'watching'
    ]
  });
});

app.get('/monrovia',(req,res) => {
  res.send({
    firstname:'vineeth',
    lastname:'chowdary',
    education:'masters',
    country:'usa'
  });
});
app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle:'About vineeth',
    currentYear:new Date().getFullYear()
  });
});
app.get('/home',(req,res) => {

res.render('home.hbs',{
  pageTitle:'home page',
  welcomeMessage:'hai vineeth this is ahome page',
  currentYear:new Date().getFullYear()
});
});

app.get('/vineeth',(req,res) => {
  res.send({
    name:'vineeth chowdary gadde',
    age:25,
    education:'masters'
  });
});
app.listen(3000,() => {
  console.log('server is up at port');
});
