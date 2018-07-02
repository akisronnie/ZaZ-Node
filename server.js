
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.post('/chat',urlencodedParser, function(req, res){
    if (!req.body) return res.sendStatus(400);
     res.render('chat', {data: req.body});
});
app.get('/', function (req,res) {
    res.render('index');
});
app.get('/index', function (req,res) {
    res.render('index');
});
app.get('/chat', function (req,res) {
    res.render('chatlogin');
});
app.get('/history', function (req,res) {
    res.render('history');
});



io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
      console.log(msg);
      
    });
  });

  http.listen(process.env.PORT || 3000, function () {console.log('Server Start');
});