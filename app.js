// app.js

const express = require('express');
const bodyParser = require('body-parser');

// initialize our express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


// Configuring the database
const dbConfig = require('./config/config_database.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

/*

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://dashone:one123@ds123434.mlab.com:23434/friendbook';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:')); 



app.get('/', (req, res) =>{
	res.json({"msg" : "Server is running on port"});

});
*/

// Require Notes routes
require('./routes/friend.routes.js')(app);


app.listen(3000, () => {
    console.log('Server is up and running on port numner ' + 3000);
});
