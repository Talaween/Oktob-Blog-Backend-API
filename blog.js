var db = require('./database');

exports.add = function(conData, data, callback){
	
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
			title: data.title,
			authorId: data.authorId,
			body:data.body,
			createdDate: data.createdDate || today,
			photo: data.photo
		};
		//perform the query
		data.query('INSERT INTO blogs SET ?', blog, function (err, result) {
			//return control to the calling module
			callback(err, result);
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
						
			callback(err, result);
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
					
			callback(err, result);
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

		//perform the query
		data.query('DELETE FROM blogs WHERE id = ' + id , function (err, result) {
			//return control to the calling module
						
			callback(err, result);
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

		//if no error prepare our blog object with the values sent by the client
		var blog = {
			title: data.title,
			authorId: data.authorId,
			body:data.body,
			createdDate: data.createdDate || today,
			photo: data.photo
		};
		//perform the query
		data.query('UPDATE blogs SET ? WHERE id = ' + req.params.id, blog, function (err, result) {
			
			//return control to the calling module
			callback(err, result);
		});
	
		
	});
};