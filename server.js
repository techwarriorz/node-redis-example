var express     = require('express');
var bodyParser  = require('body-parser');
var app = express();
var redis = require('./server/databases/redis');
var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:pass1234@ds127892.mlab.com:27892/dojo-redis');

app.use(bodyParser.json());
app.use('/', express.static(__dirname + "/client"));

//Send The Client
app.get('/', function(req, res){
	res.sendFile(__dirname + "/client/index.html");
});


var exampleCtrl = require('./server/controllers/example-controller');

//Will Ping the Database
app.get('/get-record', exampleCtrl.getRecord);

//Will Ping Redis
app.get('/get-all-records', exampleCtrl.getAllRecords);

//Will write Data to Database and Redis
app.post('/create-record', exampleCtrl.createRecord);


app.listen(3000, function(){
	console.log("ready for action")
});