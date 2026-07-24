const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// Post route for menu
router.post('/', async (req,res) =>{
   try{
  const data = req.body // Assuming the request body contains the person data 
  
  // create a new Menu document using the mongoose model
  const newMenu = new MenuItem(data);
    
  // Save the new Menu to the databse
  const response = await newMenu.save();
  console.log('data saved');
  res.status(200).json(response);
  }
  catch(err){
     console.log(err);
     res.status(500).json({error: 'Internal Server Error'});
  }
})


// GET method to get the Menu
router.get('/',async (req,res) => {
  try{
    const data = await MenuItem.find();
    console.log('data fetched');
  res.status(200).json(data);

  }catch(err){
     console.log(err);
     res.status(500).json({error: 'Internal Server Error'});
  }

})

// comment added for testing purpose
module.exports = router;