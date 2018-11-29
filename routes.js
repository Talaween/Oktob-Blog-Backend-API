'use strict'
//import user module
const user = require('./models/user');
//import our product module which handles all CRUD operations on products
const blog = require('./models/blog');
//import the login module
const login = require('./models/login')
//import our database module which handles most of general db operations
const db = require('./database');
//import our module which adds dumpData
const dump = require('./dumpData');
//import authentication module
const auth = require('./authentication');

exports.allRoutes = function (databaseData, server) {

    //------------Users Routes-----------------
    server.post('/api/v1.0/users', (req, res) => {
    
        //ectract data from request
        let userData = {
            username: req.body['username'],
            password: req.body['password'],
            firstName: req.body['firstName'],
            lastName: req.body['lastName'],
            registrationDate : req.body['registrationDate']
        }
        //we are atempting to add a user
        user.add(databaseData, userData, function (err, data){
            
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

    server.get('/api/v1.0/users', (req, res) => {
        
        //TODO: extract pagination & search parameters

        let userData = {
            
        };

        user.getAll(databaseData, userData, function (err, result){
        
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')

            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.get('/api/v1.0/users/:id', (req, res) => {

        let userData = {
            id : req.params.id
        }
        //we are atempting to retrieve one user
        //note that we get the user id through the req.params.id, id matches the path parameter name 
        user.getById(databaseData, userData, function (err, result){
            
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.delete('/api/v1.0/users/:id',(req, res) => {
        
        let userData = {
            id : req.params.id
        }

        user.deleteById(databaseData, userData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(201);
            res.end(JSON.stringify(result));
        });

    });

    server.put('/api/v1.0/users/:id', (req, res) => {
        
        let userData = {
            id : req.params.id,
            username: req.body['username'],
            password: req.body['password'],
            firstName: req.body['firstName'],
            lastName: req.body['lastName'],
            registrationDate : req.body['registrationDate']
        }
        //we are atempting to update a user
        user.updateById(databaseData, userData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(200);
            res.end(JSON.stringify(result));
        });
    });

    //------------Login Routes-----------------
    server.post('/api/v1.0/login', (req, res) => {
    
        auth.loginUser(databaseData, req, (err, result) => {

            if(err){
                res.status(err.code);
                res.end("error:" + err);
                return;
            }

            let loginData = {
                userId: result.userId,
                loginDateTime : new Date()
            }

            //we are adding a login attempt
            login.add(databaseData, loginData, function (err, finalResult){
                
                res.setHeader('content-type', 'application/json')
                res.setHeader('accepts', 'POST')
                //when adding a user is done, this code will run
                //if we got an error informs the client and set the proper response code
                if(err){
                    console.log(err)
                    res.status(err.code);
                    res.end("error:" + err);
                    return;
                }
                //if no error let's set proper response code 
                res.status(201);
                res.end(JSON.stringify(loginData));
            });
        });
    });
    //------------blogs Routes-----------------
    server.post('/api/v1.0/blogs', (req, res) => {
        
        let blogData = {
			title: req.body['title'],
			authorId: req.body['authorId'],
			body: req.body['body'],
			createdDate: new Date(),
			photo: req.body['photo'] 
        };
        
        blog.add(databaseData, blogData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(201);
            res.end(JSON.stringify(result));
        });
    })

    server.get('/api/v1.0/blogs', (req, res) => {
        
        //TODO: extract pagination and search parameters
        let blogData = {

        }
        blog.getAll(databaseData, blogData, function (err, result){
        
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.get('/api/v1.0/blogs/:id', (req, res) => {

        let blogData = {
            id : req.params.id
        }

        blog.getById(databaseData, blogData, function (err, result){
            
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.delete('/api/v1.0/blogs/:id',(req, res) => {
        
        let blogData = {
            id : req.params.id
        }

        blog.deleteById(databaseData, blogData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });

    });

    server.put('/api/v1.0/blogs/:id', (req, res) => {
        
        let blogData = {
            id : req.params.id,
            title: req.body['title'],
			authorId: req.body['authorId'],
			body: req.body['body'],
			createdDate: new Date(),
			photo: req.body['photo'] 
        }

        blog.updateById(databaseData, blogData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(200);
            res.end(JSON.stringify(result));
        });
    });


    //------------Favourites Routes-----------------
    server.post('/api/v1.0/favourites', (req, res) => {
        
        let favData = {
			userId: req.body['userId'],
			blogId: req.body['blogId']
        };
        
        favourites.add(databaseData, favData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(201);
            res.end(JSON.stringify(result));
        });
    })

    server.get('/api/v1.0/favourites', (req, res) => {
        
        //TODO: extract pagination and search parameters
        let favData = {
            userId : req.query.userId
        }
        favourites.getAll(databaseData, favData, function (err, result){
        
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.get('/api/v1.0/favourites/:id', (req, res) => {

        let favData = {
            id : req.params.id
        }

        favourites.getById(databaseData, favData, function (err, result){
            
            res.setHeader('content-type', 'application/json')
            res.setHeader('accepts', 'GET')
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    server.delete('/api/v1.0/favourites/:id',(req, res) => {
        
        let favData = {
            id : req.params.id
        }

        favourites.deleteById(databaseData, favData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            res.status(200);
            res.end(JSON.stringify(result));
        });

    });

    server.put('/api/v1.0/favourites/:id', (req, res) => {
        
        let favData = {
            id : req.params.id,
            userId: req.body['userId'],
			blogId: req.body['blogId']
        }

        favourites.updateById(databaseData, favData, function (err, result){
            
            if(err){
                res.status(400);
                res.end("error:" + err);
                return;
            }
            
            res.status(200);
            res.end(JSON.stringify(result));
        });
    })

    //this route will allow to create tables in the database
    //it should be a confidential method and can be performed only by an admin
    server.post('/api/v1.0/admin/createTables', (req, res) => {
        
        db.createTables(databaseData, function(err, result){
            if(err) {
                res.status(400);
                res.end("an error has occured:" + err);
                return;
            }
            res.status(200);
            res.end("tables were created successfully");
        });
    });


    server.post('/api/v1.0/admin/addDumpData', (req, res) => {

        //TODO make this admin only task

        //dump some users and blogs data
        dump.addUsers(databaseData);
        dump.addBlogs(databaseData);

        res.status(200);
        res.end("dump data were added successfully");
        
    });
};