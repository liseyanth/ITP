import mongoose from "mongoose";

//All attributes in here 
const supSchema = mongoose.Schema({
    name : {
        type: String,
    },
    description : {
        type: String,
    },
    amount :{
        type: String,
    },
    expirationDate : {
        type: String,
    },
    status : {
        type: String,
    }
});

const supModel = mongoose.model("sup", supSchema);
export default supModel;
