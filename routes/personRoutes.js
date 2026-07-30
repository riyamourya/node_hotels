const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// Post route to addd a person
router.post('/', async (req,res) =>{
   try{
  const data = req.body // Assuming the request body contains the person data 
  
  // create a new person document using the mongoose model
  const newPerson = new Person(data);
    
  // Save the new person to the databse
  const response = await newPerson.save();
  console.log('data saved');
  res.status(200).json(response);
  }
  catch(err){
     console.log(err);
     res.status(500).json({error: 'Internal Server Error'});
  }

})

// GET method to get the person
router.get('/',async (req,res) => {
  try{
    const data = await Person.find();
    console.log('data fetched');
  res.status(200).json(data);

  }catch(err){
     console.log(err);
     res.status(500).json({error: 'Internal Server Error'});
  }

})

router.get('/:workType', async(req, res)=>{
  try{
    const workType = req.params.workType; //Extract the work type from the URL parameter
  if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){

    const response = await Person .find({work: workType});
    console.log('response fetched');
    res.status(200).json(response);
  }else{
    res.status(404).json({error: 'Invalid work Type'});
  }
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

router.put('/:id',async (req, res)=> {
  try{
      const personId = req.params.id;  // Extract the id from the URL parameter
      const updatedPersonData = req.body; // Updated data for the person

      const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
        new: true, // return the Updated document
        runValidators: true, //Run Moongoose validation
      })

      if(!response){
        return res.status(404).json({error: 'Person not found'});
      }

      console.log('data updated');
      res.status(200).json(response);

  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

router.delete('/:id', async (req ,res) =>{
  try{
    const personId = req.params.id;  // Extract the id from the URL parameter

    // Assuming you have a person model
    const response = await Person.findByIdAndDelete(personId);
    if(!response){
        return res.status(404).json({error: 'Person not found'});
      }
      console.log('data deleted');
      res.status(200).json({message:'person Deleted successfully'});
    }
    catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
})

module.exports = router;