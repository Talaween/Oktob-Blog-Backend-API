'use strict'

var db = require('./database');

exports.loginUser = (conData, request, callback) => {
	
	if (request.authorization === undefined || request.authorization.basic === undefined){
		//throw new Error('authorization header missing')
		let err = {message:'authorization header missing'};
		console.log("-->" + err.message);
		callback(err);
		return;
	}
		
	const auth = request.authorization.basic

	if (auth.username === undefined || auth.password === undefined){
		//throw new Error('missing username and/or password')
		let err = {message:'missing username and/or password'};
		console.log("-->" + err.message);
		callback(err);
		return;
	}
		
	
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			console.log("error in connecting to db")
			callback(err);
			return;
		}	
		
		//perform the query
		data.query('SELECT username FROM users WHERE username="' + auth.username + '" AND password="' + auth.password + '"', function (err, result) {
			
			if(err){
				console.log("error in executing the query")
				callback(err);
				return;
			}
			
			//return control to the calling module
			if(result && result.length > 0)
				callback(null, {login:"success"});
			else
				callback(null, {login:"fail"});
		});
	});
}