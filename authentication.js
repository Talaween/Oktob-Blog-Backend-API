'use strict'

const db = require('./database');
const auth = require ('basic-auth');

exports.loginUser = (conData, request, callback) => {
	
	//first check if basic authorization is present
	if (request.headers.authorization === undefined){
		//throw new Error('authorization header missing')
		let err = {
			message:'Authorization header missing',
			code: 401
		};
		callback(err);
		return;
	}
		
	var loginData = auth(request);

	//extract username and password from the auth
	if (loginData.name === undefined || loginData.pass === undefined){
		//throw new Error('missing username and/or password')
		let err = {
			message:'missing username and/or password',
			code: 401
		};
		callback(err);
		return;
	}
	
	//connect to the database to check if there is such as username with such password
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			err.code = 500;
			callback(err);
			return;
		}	
		
		//perform the query, note we only select username not all fields
		//TODO encrypt the passwords in db
		data.query('SELECT id FROM users WHERE username="' + loginData.name + '" AND password="' + loginData.pass + '"', function (err, result) {
			
			if(err){
				err.code = 500;
				callback(err);
				return;
			}
			
			//return control to the calling module
			//return null for error with data indicating successful login
			//return an error data with login false and null for data
			//the calling module will be responsible to handle the response and set response code
			if(result && result.length > 0){
				callback(null, {userId : result[0].id});
			}
				
			else
				callback({
					message : 'wrong username or password',
					code: 401
				});
		});
	});
}