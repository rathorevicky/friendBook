const jwt = require('jsonwebtoken');
//const User = require('../models/friend.model.js');

module.exports = (app) => {
    const users = require('../controllers/friend.controller.js');

    app.post('/api/login', (req, res)=>{
        //console.log("In login");
        //console.log("req "+ req.headers);
        var user = req.body.userid;
        var password = req.body.password;
         const user1 = {
                userid : user,
                password : password
            }

        jwt.sign({user : user1}, 'myappsecret', (err, token)=>{
            res.json({token});
        });
        //res.json({message : 'Login Successfully'});
    });



    // Create a new Note
    app.post('/api/signup', verifyToken, users.create);

    // Retrieve all Notes
    //app.get('/api/friends',verifyToken, users.findAll);

    // Retrieve a single Note with noteId
   // app.get('/api/:friendId', users.findOne);

    // Update a Note with noteId
    app.put('/api/addfriend/:friendId',verifyToken, users.add);

    // Delete a Note with noteId
   app.delete('/api/remove/:friendId', users.remove);

    function verifyToken(req, res, next){
        // Get auth header value
        console.log("in auth");
        const bearerHeader = req.headers['authorization'];
        console.log("auth :" + req.headers['']);
        // Check if bearer is undefined
        if(typeof bearerHeader !== 'undefined') {
            console.log("here ");
            // Split at the space
            const bearer = bearerHeader.split(' ');
            // Get token from array
            const bearerToken = bearer[1];
            // Set the token
            req.token = bearerToken;
            req.user = user1;
            // Next middleware
            next();
        } else {
             // Forbidden
             console.log("Here :" + bearerHeader);
            res.sendStatus(403);
        }
    }
    
}