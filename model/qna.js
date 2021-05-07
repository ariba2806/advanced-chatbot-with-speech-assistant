const mongoose=require('mongoose');
const Qna=new mongoose.Schema({
    response:String,
});
module.exports=mongoose.model("qna",Qna);