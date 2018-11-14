var db = require('./database');
var auth = require('./authentication');

exports.add = function(conData, req, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//TODO: server validation
		
		//if no error prepare our blog object with the values sent by the client
		today = new Date().toISOString().slice(0, 19).replace('T', ' ');
		var blog = {
		  title: req.body['title'],
		  authorId: req.body['authorId'],
		  body: req.body['body'],
		  createdDate: req.body['date'] || today,
		  photo: req.body['photo'] 
		};
		//perform the query
		data.query('INSERT INTO blogs SET ?', blog, function (err, result) {
			//return control to the calling module
			callback(err, blog);
		});
	});
};


exports.getAll = function(conData, req, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
				
		//perform the query
		data.query('SELECT * FROM blogs', function (err, result) {
			//return control to the calling module
			
			let data = JSON.stringify(result);
			
			callback(err, data);
		});	
			
	});
};

exports.getById = function(conData, id, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	
		
		//perform the query
		data.query('SELECT * FROM blogs WHERE id = ' + id , function (err, result) {
			//return control to the calling module
			
			let data = JSON.stringify(result);
			
			callback(err, data);
		});
	});
};

exports.deleteById = function(conData, req, callback){
	
	var id = req.params.id;
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}	

		auth.loginUser(conData, req, function(err, result){
			
			if (err) {
				callback(err);
				return;
			}
			
			if(result.login === "success"){
				
				//perform the query
				data.query('DELETE FROM blogs WHERE id = ' + id , function (err, result) {
					//return control to the calling module
					
					let data = JSON.stringify(result);
					
					callback(err, data);
				});
			}
			else{
				let err = {message:"username or password is incorrect"};
				callback(err);
			}
			
		});
	});
};

exports.updateById = function(conData, req, callback){
	
	//first connect to DB
	db.connect(conData, function(err, data){
		
		//when done check for any error
		if (err) {
			callback(err);
			return;
		}

		auth.loginUser(conData, req, function(err, result){
			
			if (err) {
				callback(err);
				return;
			}
			
			if(result.login === "success"){
				
				//if no error prepare our blog object with the values sent by the client
				var blog = {
					title: req.body['title'],
					authorId: req.body['authorId'],
					body: req.body['body'],
					date: req.body['date'],
					photo: req.body['photo'] 
				};
				//perform the query
				data.query('UPDATE blogs SET ? WHERE id = ' + req.params.id, blog, function (err, result) {
					//return control to the calling module
					callback(err, blog);
				});
			}
			else{
				let err = {message:"username or password is incorrect"};
				callback(err);
			}
			
		});		
	
		
	});
};