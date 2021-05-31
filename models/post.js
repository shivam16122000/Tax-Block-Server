var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new Schema({
    user:{type:Schema.Types.ObjectId,ref:'User',required:true},
    name:{type:String,required:true},
    address:{type:String,required:true},
    email:{type:String,required:true},
    loanAmount:{type:Number,required:true},
    startDate:{type:Date,required:true},
    expiryDate:{type:Date,required:true},
    monthlyInstallment:{type:Number,required:true}
});

module.exports = mongoose.model('Post',PostSchema);