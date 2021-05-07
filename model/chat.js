const mongoose=require('mongoose');
const Chat=new mongoose.Schema({
    question:String,
    response:String,
    time:Date,
});
module.exports=mongoose.model("chat",Chat);