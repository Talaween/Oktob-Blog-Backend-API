//import express module
var express = require('express');
//import cors to enable cors
const cors = require('cors');
//import body parser
const bodyParser = require('body-parser');

//import user module
var user = require('./user');
//import our product module which handles all CRUD operations on products
var blog = require('./blog');
//import our database module which handles most of general db operations
var db = require('./database');

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

//route any requests to http://localhost:8080/users to this function
server.post('/users', (req, res) => {
	
	//we are atempting to add a user
	user.add(databaseData, req, function (err, data){
		
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST')
		//when adding a user is done, this code will run
		//if we got an error informs the client and set the proper response code
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		//if no error let's set proper response code and have a party
		res.status(201);
		res.end(JSON.stringify({message:"user added successfully"}));
	});
})

//route any requests to http://localhost:8080/users to this function
server.post('/users/login', (req, res) => {
	
	//we are atempting to add a user
	user.login(databaseData, req, function (err, data){
		
		//when adding a user is done, this code will run
		//if we got an error informs the client and set the proper response code
		if(err){
			//set status bad request
			res.status(400);
			res.end(JSON.stringify(err));
			return;
		}
		//if no error let's set proper response code and have a party
		if(data.value == 1){
			//set status OK
			res.status(200);
		}
		else{
			//set status unauthorised
			res.status(401);
		}
		
		res.end(JSON.stringify(data));
		
	});
})

server.get('/users', (req, res) => {
	
	user.getAll(databaseData, req, function (err, data){
	
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		
		res.status(200);
		res.end(data);
	});
})

server.get('/users/:id', (req, res) => {

	
	//we are atempting to retrieve one user
	//note that we get the user id through the req.params.id, id matches the path parameter name 
	user.getById(databaseData, req, function (err, data){
		
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		res.status(200);
		res.end(data);
	});
})

server.del('/users/:id',(req, res) => {
	
	user.deleteById(databaseData, req, function (err, data){
		
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		res.status(201);
		res.end(data);
	});

});

server.put('/users/:id', (req, res) => {
	
	//we are atempting to update a user
	user.updateById(databaseData, req, function (err, data){
		

		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		
		res.status(200);
		res.end("success");
	});
})

//------------blogs Routes-----------------

//route any requests to http://localhost:8080/sellers to this function
server.post('/blogs', (req, res) => {
	
	blog.add(databaseData, req, function (err, data){
		
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		
		res.status(201);
		res.end("success");
	});
})

server.get('/blogs', (req, res) => {
	
	blog.getAll(databaseData, req, function (err, data){
	
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		res.status(200);
		res.end(data);
	});
})

server.get('/blogs/:id', (req, res) => {

	blog.getById(databaseData, req, function (err, data){
		
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		res.status(200);
		res.end(data);
	});
})

server.del('/blogs/:id',(req, res) => {
	
	blog.deleteById(databaseData, req, function (err, data){
		
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		res.status(200);
		res.end(data);
	});

});

server.put('/blogs/:id', (req, res) => {
	
	blog.updateById(databaseData, req, function (err, data){
		
		if(err){
			res.status(400);
			res.end("error:" + err);
			return;
		}
		
		res.status(200);
		res.end("success");
	});
})

//this route will allow to create tables in the database
//it should be a confidential method and can be performed only by an admin
server.post('/createTables', (req, res) => {
	
	db.createTables(databaseData, function(err, state){
		if(err) {
			res.status(400);
			res.end("an error has occured:" + err);
			return;
		}
		res.status(200);
		res.end("tables were created successfully");
	});
})

//start the server 
server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log(`App is ready on port ${port}`)
	}
})