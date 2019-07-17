//node package manager requirements 
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//configure express to port 3000 localhost
var app = express();
var PORT = process.env.PORT || 3000;

// Express app setup using bodyparser to view data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// set up static files in express
app.use(express.static(path.join(__dirname, 'app/public')));

//ROUTES
//================================================
//set up routes by requiring from routing folder 
//send app object through require 
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/html.Routes.js')(app);

// Server begins listening
app.listen(PORT, function () {
	console.log('App listening on PORT ' + PORT);
});
