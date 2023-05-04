const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{ // to link which user has commented
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    post:{ // to link the user to which the post he commented
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true
    }
},{
    timestamps:true
});

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;