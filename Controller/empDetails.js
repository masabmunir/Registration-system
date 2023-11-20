let express = require('express');
const empDetails = require('../Modals/empDetails')
const ObjectID = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = async (req, res) => {
    try {
      const data = await empDetails.find({});
      console.log(data)
      res.json(data); // Sending JSON response
    } catch (err) {
      console.error("Error in getting data", err);
      res.status(500).send("Error fetching data");
    }
  };


const addUser = async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
  
      // Encrypt the password
      const encryptedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await new empDetails({
        firstName,
        lastName,
        email,
        password: encryptedPassword, // Save the hashed password
      }).save();
  
      // Generate JWT token
      const token = jwt.sign(
        { user_id: newUser._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
  
      // Return the new user along with the token
      return res.status(200).json({
        message: "Success",
        user: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          _id: newUser._id,
          __v: newUser.__v,
        },
        token: token,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        message: "Error",
        error: error.message,
      });
    }
  };
  

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    const user = await empDetails.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      return res.status(200).json(user); // Return the response and end the function
    }

    return res.status(400).send("Invalid Credentials"); // Moved inside the else block
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
};



const delData = async (req, res) => {
  try {
    const validId = ObjectID.isValid(req.params.id);
    if (!validId) {
      return res.status(400).send('Invalid ID');
    }

    const deletedEmp = await empDetails.findByIdAndDelete(req.params.id);
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
    // Destructure required fields from req.body
    const { firstName, lastName, email,password } = req.body;

    // Create user object
    const updatedUser = {
      firstName,
      lastName,
      email,
      password
    };

    // Validate ID
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(400).send('Invalid ID: ' + req.params.id);
    }

    // Find and update document
    const updatedDocument = await empDetails.findByIdAndUpdate(
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



module.exports= {User,addUser,loginUser,delData,updateData}