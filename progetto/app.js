var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require ('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/dati');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/dati', usersRouter);

app.get('/dati',function(req,res){
    res.sendFile(path.join(__dirname,'/routes/dati.js'));
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
module.exports = app;
