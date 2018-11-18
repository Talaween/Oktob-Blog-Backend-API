'use strict'

const db = require('./database');

exports.loginUser = (conData, request, callback) => {
	
	//first check if basic authorization is present
	if (request.authorization === undefined || request.authorization.basic === undefined){
		//throw new Error('authorization header missing')
		let err = {message:'authorization header missing'};
		console.log("-->" + err.message);
		callback(err);
		return;
	}
		
	const auth = request.authorization.basic

	//extract username and password from the auth
	if (auth.username === undefined || auth.password === undefined){
		//throw new Error('missing username and/or password')
		let err = {message:'missing username and/or password'};
		console.log("-->" + err.message);
		callback(err);
		return;
	}
	
	//connect to the database to check if there is such as username with such password
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			console.log("error in connecting to db")
			callback(err);
			return;
		}	
		
		//perform the query, note we only select username not all fields
		//please note we have not uet encrypted the passwords
		data.query('SELECT username FROM users WHERE username="' + auth.username + '" AND password="' + auth.password + '"', function (err, result) {
			
			if(err){
				console.log("error in executing the query")
				callback(err);
				return;
			}
			
			//return control to the calling module
			//return null for error with data indicating successful login
			//return an error data with login false and null for data
			//the calling module will be responsible to handle the response and set response code
			if(result && result.length > 0)
				callback(null, {login:true});
			else
				callback({login:false});
		});
	});
}