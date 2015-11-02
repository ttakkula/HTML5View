var express = require("express");
var path = require("path");
var database = require('./modules/database');
var queries = require('./modules/queries');
var person = require('./modules/person');
var app = express();
//======================Middlewares==================================

app.use(function(req,res,next){
    console.log(req.method);
    console.log(req.path);
    console.log(__dirname);
    console.log(database.Person);
    database.myFunction();
    //Send request forward in stack
    next();
});

app.use('/',express.static(path.join(__dirname, 'views')));
app.use('/css',express.static(path.join(__dirname, 'css')));
app.use('/controllers',express.static(path.join(__dirname, 'controllers')));
app.use('/lib',express.static(path.join(__dirname, 'lib')));

app.use('/persons',person);
//======================ROUTERS======================================
/*
app.get("/persons",function(req,res){
    queries.getAllPersons(req,res);
    // res.send("Hello persons there!");
});
*/

app.listen(3000);