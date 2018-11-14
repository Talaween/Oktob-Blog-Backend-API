//import express module
var express = require('express');
//import cors to enable cors
const cors = require('cors');
//import body parser
const bodyParser = require('body-parser');

routes = require('./routes');
dump = require('./dumpData');

//create the express module
const server = express()

//To parse json data
server.use(bodyParser.json())

//enable all origins 
server.use(cors());
//enable cors for more complex routes
server.options('*', cors());

//prepare our database connection parameters
const databaseData = { 
	host:"localhost",
	user:"root",
	password: "",
	database: "myBlog"
};
//save server port on global variable
var port = 8080;

//------------Users Routes-----------------

routes.allRoutes(databaseData, server);

//start the server 
server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log(`App is ready on port ${port}`);

		dump.addUsers(databaseData);
	}
})