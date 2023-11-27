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
  

module.exports= {Emp,addemp }