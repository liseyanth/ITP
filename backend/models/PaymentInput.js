const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    
 
    FirstName : {
        type: String,
        required:true
    },
    LastName : {
        type: String,
        required:true
    },
    Mail : {
        type: String,
        required:true
    },
    Telephone : {
        type: Number,
        required:true
    },
    Country : {
        type: String,
        required:true
    },
    City : {
        type: String,
        required:true
    },
    Address : {
        type: String,
        required:true
    },
    PostalCode : {
        type: String,
        required:true
    },
    Province : {
        type: String,
        required:true
    },
    Time :
    {
        type:  String,
        required:true
    },
    Status:{
        type:String,
        default:'pending'
    }
     
})
const Payment=mongoose.model("Payment",paymentSchema)
module.exports=Payment