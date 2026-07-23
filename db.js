const mongoose = require('mongoose');

//definr the Mongodb connection Url
const mongoURL = 'mongodb://localhost:27017/hotels'

//set up Mongodb connection
mongoose.connect(mongoURL);

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