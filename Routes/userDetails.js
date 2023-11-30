let express = require('express');
const router = express.Router();
const userDetails = require('../Modals/userDetails');
const {Emp,addemp,delData,updateData}= require('../Controller/userDetails')
const ObjectID = require('mongoose').Types.ObjectId;


router.get('', Emp)


router.post('/addEmp',addemp);

router.delete('/:id',delData)


router.put('/:id', updateData);

module.exports = router