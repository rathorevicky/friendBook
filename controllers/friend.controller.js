const User = require('../models/friend.model.js');
//const Lastid = require('../models/lastid.model.js');
const mongoose = require('mongoose');
var Lastid = mongoose.model('Lastid', 
									mongoose.Schema({id : Number}));

function getNextSequence(modelname, name, callback) {
		
		modelname.findOne({}, function(err, result){
    		console.log("result : " + result);
    		newid = result.id;
    		console.log("result to newid :" + result.id);
    		callback(err, result.id)
    	});
		/*var query = {};
    	l1.find({}, function(err, result){
    	console.log("getNextSequence :" + result.value);
        //if(err) callback(err, result);
        if (!result){
        	const tempid = new Lastid({id : 1001});
        	l1.save();
        }*/
        //callback(err, result.value.seq);
    //});
};

// Create and Save a new Note
exports.create = (req, res) => {

	console.log("In create ");
	 // Validate request
    if(!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }

    
    Lastid.findOne({}).then(data => {
    		console.log("Getting Last Id --" + data);
    		//const nextId = new Lastid({
    		//	id : data.id+1
    		//});
    		//data.id = data.id+1;
    		Lastid.findOneAndUpdate({},{$set :{id :data.id+1}}).then(result =>{
    				console.log("update last id!!")
    			}).catch(err =>{
    				console.log("lastid updation failed")
    		});

    		//console.log("Return id "+ data.id);
    		const user = new User({
        				//title: req.body.title || "Untitled Note", 
        				//content: req.body.content
        				//Lastid.findOne({}, function(err, result){
    					id : data.id+1, 
        				name : req.body.name,
        				//picture : req.body.picture,
        				//dob : req.body.dob,
        				email : req.body.email,
       					password : req.body.password
       				});



    console.log("Email "+ user.email);
    User.find({email: user.email}).then(data =>{
    	//onsole.log("User Exists"+ data);
    	res.status(500).send({message : "User Already Exists With this EmailId!"});
    }).catch(err=>{
    	console.log("okk");
    	// insert user into the database
    	user.save().then(data => {
    	console.log("New user created --");
        res.send(data);//, {message : "Please Login to add Friends and Search People"});
    	}).catch(err => {
        	res.status(500).send({
            message: err.message || "Some error occurred while creating the New User."
        });
    });
    	//newid = data.id;
        //res.send(data);
    }).catch(err => {
    	const nextId = new Lastid({
    		id : 1000
    	});
    	nextId.save();
        res.status(500).send({
            message: err.message || "Some error occurred while creating the New User."
        });
    });
  });
};
 

exports.add = (req, res)=>{
	console.log("herexxxxxxx");
	var userid = req.params.friendId;
	console.log("add Friend :"+ req.userid);
	User.find({id: useid}).then(retUser=>{
		console.log("user " + data);
		const friends = retUser.friends;
		var newfriends = friends + [userid];
		retUser.update({friend : newfriends});
	}).catch(err=>{
		res.status(500).send({message : "User not Found!"});
	});

};


exports.remove = (req, res) =>{
	var userid = req.params.friendId;
	console.log("remove Friend :"+ req.userid);
	User.findAndDelete({id: useid}).then(data=>{
		console.log("user " + data);
		data.save();
	}).catch(err=>{
		res.status(500).send({message : "User not Found!"});
	});
}