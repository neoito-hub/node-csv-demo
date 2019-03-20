var express 	= require('express');
var routes = require('./routes') 
var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(routes);
app.listen(3010, function() {
    console.log("Node app is running at localhost:3010");
});