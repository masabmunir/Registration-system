let express = require('express');
const userDetails = require('../Modals/userDetails')
const ObjectID = require('mongoose').Types.ObjectId;
require('dotenv').config();

const Emp = async (req, res) => {
  try {
    const data = await userDetails.find({});
    console.log(data)
    res.json(data); // Sending JSON response
  } catch (err) {
    console.error("Error in getting data", err);
    res.status(500).send("Error fetching data");
  }
};

const addemp = async (req, res) => {
    try {
      const { firstName, lastName, email } = req.body;
  
      const newUser = await new userDetails({
        firstName,
        lastName,
        email,
      }).save();
  
      // Return the limited user details
      return res.status(200).json({
        message: "Success",
        user: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Error",
        error: error.message,
      });
    }
};
  

  const delData = async (req, res) => {
    try {
      const validId = ObjectID.isValid(req.params.id);
      if (!validId) {
        return res.status(400).send('Invalid ID');
      }
  
      const deletedEmp = await userDetails.findByIdAndDelete(req.params.id);
      if (!deletedEmp) {
        return res.status(404).send('No record found with ID ' + req.params.id);
      }
      
      res.send(deletedEmp);
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).send('Error deleting data');
    }
};
  

  const updateData = async (req, res) => {
    try {
      const { firstName, lastName, email } = req.body;
  
      // Create user object
      const updatedUser = {
        firstName,
        lastName,
        email
      };
  
      // Validate ID
      if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('Invalid ID: ' + req.params.id);
      }
  
      // Find and update document
      const updatedDocument = await userDetails.findByIdAndUpdate(
        req.params.id,
        { $set: updatedUser },
        { new: true }
      );
  
      // Handle if document doesn't exist
      if (!updatedDocument) {
        return res.status(404).send('No record found with ID ' + req.params.id);
      }
  
      // Send the updated document as a response
      res.send(updatedDocument);
    } catch (err) {
      console.error("Error updating data:", err);
      res.status(500).send("Internal Server Error");
    }
};
  

module.exports= {Emp,addemp,delData,updateData }