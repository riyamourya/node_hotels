const express = require ('express');


const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());//req.body



app.get('/', function (req, res){
  res.send('Welcome to our hotel')
})



// Import the router  files
const personRoutes =require('./routes/personRoutes');
const menuitemRoutes = require('./routes/menuitemRoutes')

// Use the router
app.use('/menu', menuitemRoutes);
app.use('/person', personRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})