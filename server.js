var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var fs = require('fs');
app.use('/public', express.static('public'));
app.set('view engine', 'ejs');
var username = 'Пользователь';
var userlist =[];
var chatlog = [];

app.post('/chat',urlencodedParser, function(req, res){
    if (!req.body) return res.sendStatus(400);
		username = req.body.username;    
	
    res.render('chat', {data: req.body});
});

app.get('/', function (req,res) {
    res.render('index');
});
app.get('/index', function (req,res) {
    res.render('index');
});
app.get('/history', function (req,res) {
    res.render('history');
});
app.get('/autosell', function (req,res) {
    res.render('autosell');
});
app.get('/chat', function(req, res){
	 {res.render('chatlogin');}
});
function EnterChat() {
	io.emit('chatlog', chatlog);
	userlist.push(' '+username);
	io.emit('chat message', 'Вошел в чат ' + username, userlist);
	chatlog.push(username + ':Вошел в чат');
}
function LeaveChat() {
		for (i=0;i<userlist.length; i++){
			if (userlist[i]==(' '+username)) { userlist.splice(i, 1)}
		  	}
		io.emit('chat message', 'Вышел с чата ' + username, userlist);
		chatlog.push(username + ':Вышел с чата');
}
function chatMsg(msg, userlist) {
	io.emit('chat message', msg, userlist);
	chatlog.push(msg);
	if (chatlog.length>20){chatlog.splice(1,1)};
}
io.on('connection', function(socket){
		EnterChat();
	socket.on('disconnect', function(){
		LeaveChat();
	});
	socket.on('chat message', function(msg){
		chatMsg(msg,userlist);
  });
})

http.listen(process.env.PORT || 3000, function () {console.log('Server Start')});