const mongoose = require('mongoose');
require('dotenv').config();

//define the Mongodb connection Url
//const mongoURL = 'mongodb://localhost:27017/hotels'
//const mongoURL = process.env.MONGODB_URL_LOCAL; 
const mongoURL = process.env.MONGODB_URL;


//set up Mongodb connection
mongoose.connect(mongoURL);

console.log("Mongo URL:", process.env.MONGODB_URL);

const db = mongoose.connection;
// define event listener for database connection
db.on('connected',() =>{
    console.log('Connected to Mongodb server');
});

db.on('error',(err) => {
    console.error('Mongodb connection error', err);
});

db.on('disconnected',() =>{
    console.log('Mongodb disconnected');
});

//Export database connection
module.exports = db;