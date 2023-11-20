const mongoose = require('mongoose');


const empDetails=mongoose.Schema({

    firstName:{
        type:String,
        required:true
    },

    lastName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        unique:true,
        required:true
    },

    password: { 
        type: String,
        required:true
    },

    token: { 
        type: String 
    },
})

module.exports = mongoose.model('empDetails',empDetails)