const mongoose = require('mongoose');
const SignupSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    
});
const SignUp = new mongoose.model('SignUp',SignupSchema);
module.exports = SignUp;