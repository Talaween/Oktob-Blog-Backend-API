var db = require('./database');

//this function is responsible for adding a new user
exports.add = function(conData, data, callback){
	
	//TODO: server validation

	//if pass validation connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			console.log("error in connecting to db:" + err)
			callback(err);
			return;
		}	
		
		//if no error prepare our user object with the values sent by the client
		var user = {
			username: data.username,
			password: data.password,
			firstName: data.firstName,
			lastName: data.lastName,
			registrationDate: data.registrationDate
		};
		//perform the query
		data.query('INSERT INTO users SET ?', user, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
	});
};

exports.getAll = function(conData, data, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//perform the query
		data.query('SELECT * FROM users', function (err, result) {
			//return control to the calling module
						
			callback(err, result);
		});
		
	});
};

exports.getById = function(conData, data, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	

		//perform the query
		data.query('SELECT * FROM users WHERE id = ' + data.id , function (err, result) {
			//return control to the calling module
						
			callback(err, result);
		});			
		
	});
};

exports.deleteById = function(conData, data, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	

		//perform the query
		data.query('DELETE FROM users WHERE id = ' + data.id , function (err, result) {
			
			//return control to the calling module
			callback(err, result);
		});			
		
	});
};

exports.updateById = function(conData, data, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//if no error prepare our user object with the values sent by the client
		var user = {
			username: data.username,
			password: data.password,
			firstName: data.firstName,
			lastName: data.lastName,
			registrationDate: data.registrationDate
		};
		//perform the query
		data.query('UPDATE users SET ? WHERE id = ' + data.id, user, function (err, result) {
			//return control to the calling module
			callback(err, result);
		});
		
	});
};