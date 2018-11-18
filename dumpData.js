
const user = require("./models/user");
const blog = require("./models/blog");

let usersData = [
        {
            username: 'mahmoud@yahoo.com',
            password: '123456',
            firstName: 'Mahmoud',
            lastName: 'Awad',
            registrationDate: new Date()
        },
        {
            username: 'Rooney@yahoo.com',
            password: '123456',
            firstName: 'Rooney',
            lastName: 'England',
            registrationDate: new Date()
        },
        {
            username: 'Inesta@yahoo.com',
            password: '123456',
            firstName: 'Inesta',
            lastName: 'Awad',
            registrationDate: new Date()
        },
        {
            username: 'again@yahoo.com',
            password: '123456',
            firstName: 'Richard',
            lastName: 'Lane',
            registrationDate: new Date()
        },
        {
            username: 'something@yahoo.com',
            password: '123456',
            firstName: 'something',
            lastName: 'test',
            registrationDate: new Date()
        },
        {
            username: 'test@yahoo.com',
            password: '123456',
            firstName: 'test',
            lastName: 'Awad',
            registrationDate: new Date()
        },
        {
            username: 'mike@yahoo.com',
            password: '123456',
            firstName: 'Mike',
            lastName: 'Oli',
            registrationDate: new Date()
        }
    ]

let blogData = [
    {
        title: 'lorem ipson',
        authorId: 1,
        body: "lorem ipson some text",
        createdDate: new Date(),
        photo: "./photo.jpeg" 
    }
]
let addUser = function(conData, userData){
    
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