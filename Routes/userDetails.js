let express = require('express');
const router = express.Router();
const userDetails = require('../Modals/userDetails');
const {Emp,addemp}= require('../Controller/userDetails')
const ObjectID = require('mongoose').Types.ObjectId;


router.get('', Emp)


router.post('/addEmp',addemp)

module.exports = router