//import user module
var user = require('./user');
//import our product module which handles all CRUD operations on products
var blog = require('./blog');
//import our database module which handles most of general db operations
var db = require('./database');

exports.allRoutes = function (databaseData, server) {

    //route any requests to http://localhost:8080/users to this function
    server.post('/users', (req, res) => {
    
        //ectract data from request
        let data = {
            username: req.body['username'],
            password: req.body['password'],
            firstName: req.body['firstName'],
            lastName: req.body['lastName'],
            registrationDate : req.body['registrationDate']
        }
        //we are atempting to add a user
        user.add(databaseData, data, function (err, data){
            
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

    server.get('/users', (req, res) => {
        
        //TODO: extract pagination & search parameters

        let data = {
            
        };

        user.getAll(databaseData, data, function (err, data){
        
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

        let data = {
            id : req.params.id
        }
        //we are atempting to retrieve one user
        //note that we get the user id through the req.params.id, id matches the path parameter name 
        user.getById(databaseData, data, function (err, data){
            
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

    server.delete('/users/:id',(req, res) => {
        
        let data = {
            id : req.params.id
        }

        user.deleteById(databaseData, data, function (err, data){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(201);
            res.end(data);
        });

    });

    let data = {
        id : req.params.id,
        username: req.body['username'],
        password: req.body['password'],
        firstName: req.body['firstName'],
        lastName: req.body['lastName'],
        registrationDate : req.body['registrationDate']
    }
    server.put('/users/:id', (req, res) => {
        
        //we are atempting to update a user
        user.updateById(databaseData, data, function (err, data){
            

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
        
        let blogData = {
			title: req.body['title'],
			authorId: req.body['authorId'],
			body: req.body['body'],
			date: req.body['date'],
			photo: req.body['photo'] 
        };
        
        blog.add(databaseData, blogData, function (err, data){
            
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
        
        //TODO: extract pagination and search parameters
        let blogData = {

        }
        blog.getAll(databaseData, blogData, function (err, data){
        
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

        let blogData = {
            id : req.params.id
        }

        blog.getById(databaseData, blogData, function (err, data){
            
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

    server.delete('/blogs/:id',(req, res) => {
        
        let blogData = {
            id : req.params.id
        }

        blog.deleteById(databaseData, blogData, function (err, data){
            
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
        
        let blogData = {
            id : req.params.id,
            title: req.body['title'],
			authorId: req.body['authorId'],
			body: req.body['body'],
			date: req.body['date'],
			photo: req.body['photo'] 
        }

        blog.updateById(databaseData, blogData, function (err, data){
            
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
};