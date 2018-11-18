'use strict'

var db = require('../database');

//this function is responsible for adding a new user
exports.add = function(conData, userData, callback){
	
	//TODO: server validation

	//if pass validation connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			console.log("error in connecting to db:" + err)
			callback(err);
			return;
		}	
		
		//TODO server validation


		//perform the query
		conn.query('INSERT INTO users SET ?', userData, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	});
};

exports.getAll = function(conData, userData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//perform the query
		conn.query('SELECT * FROM users', function (err, result) {
			//return control to the calling module
						
			callback(err, result);
		});
		
	});
};

exports.getById = function(conData, userData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	

		//perform the query
		conn.query('SELECT * FROM users WHERE id = ' + userData.id , function (err, result) {
			//return control to the calling module
						
			callback(err, result);
		});			
		
	});
};

exports.deleteById = function(conData, userData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	

		//perform the query
		conn.query('DELETE FROM users WHERE id = ' + userData.id , function (err, result) {
			
			//return control to the calling module
			callback(err, result);
		});			
		
	});
};

exports.updateById = function(conData, userData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//if no error prepare our user object with the values sent by the client
		let user = {
			username: userData.username,
			password: userData.password,
			firstName: userData.firstName,
			lastName: userData.lastName,
			registrationDate: userData.registrationDate
		};
		//perform the query
		data.query('UPDATE users SET ? WHERE id = ' + userData.id, user, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
		
	});
};