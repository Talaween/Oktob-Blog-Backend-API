
var user = require("./user");
var blog = require("./blog");

var usersData = [
        {
            username: 'mahmoud@yahoo.com',
            password: '123456',
            firstName: 'Mahmoud',
            lastName: 'Awad',
            registrationDate:Date.now()
        },
        {
            username: 'Rooney@yahoo.com',
            password: '123456',
            firstName: 'Rooney',
            lastName: 'England',
            registrationDate:Date.now()
        },
        {
            username: 'Inesta@yahoo.com',
            password: '123456',
            firstName: 'Inesta',
            lastName: 'Awad',
            registrationDate:Date.now()
        },
        {
            username: 'again@yahoo.com',
            password: '123456',
            firstName: 'Richard',
            lastName: 'Lane',
            registrationDate:Date.now()
        },
        {
            username: 'something@yahoo.com',
            password: '123456',
            firstName: 'something',
            lastName: 'test',
            registrationDate:Date.now()
        },
        {
            username: 'test@yahoo.com',
            password: '123456',
            firstName: 'test',
            lastName: 'Awad',
            registrationDate:Date.now()
        },
        {
            username: 'mike@yahoo.com',
            password: '123456',
            firstName: 'Mike',
            lastName: 'Oli',
            registrationDate:Date.now()
        }
    ]
var addUser = function(conData, userData){
    
    user.add(conData, userData, function (err, data){
    
        if(err){
            console.log("the following error occured:" + err);
            return;
        }
        console.log("user added sucessfully");
    });
}

exports.addUsers = function(conData){

    usersData.forEach(async element => {

        addUser(conData, element);
    });

}