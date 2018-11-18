'use strict'

var db = require('../database');

exports.add = function(conData, favData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//TODO: server validation
		
		//perform the query
		conn.query('INSERT INTO favourites SET ?', favData, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	});
};


exports.getAll = function(conData, favData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
				
		//perform the query
		data.query('SELECT * FROM favourites', function (err, result) {
			//return control to the calling module
						
			callback(err, result);
		});	
			
	});
};

exports.getById = function(conData, favData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//perform the query
		conn.query('SELECT * FROM favourites WHERE id = ' + favData.id , function (err, result) {
			//return control to the calling module
					
			callback(err, result);
		});
	});
};

exports.deleteById = function(conData, favData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	

		//perform the query
		data.query('DELETE FROM favourites WHERE id = ' + favData.id , function (err, result) {
			//return control to the calling module
						
			callback(err, result);
		});
	});
};

exports.updateById = function(conData, favData, callback){
	
	//first connect to DB
	db.connect(conData, function(err, conn){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}

        //TODO server validation


		//perform the query
		conn.query('UPDATE favourites SET ? WHERE id = ' + favData.id, favData, function (err, result) {
			
			//return control to the calling module
			callback(err, result);
		});
	
		
	});
};