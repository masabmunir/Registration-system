let express = require('express');
const router = express.Router();
const empDetails = require('../Modals/empDetails');
const {User,addUser,loginUser,delData,updateData}= require('../Controller/empDetails')
const ObjectID = require('mongoose').Types.ObjectId;
const auth = require("../middleware/auth");

//we can use auth in get request for data protection 

router.get('',auth, User)

//register route
router.post('/addemp',addUser)

//login route 
router.post('/login',loginUser)

router.delete('/:id',delData)

// update route
router.put('/:id', updateData);

module.exports= router;