const mongoose = require('mongoose');
const Like = require('./like');


const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{ // to link user to  the post
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    comments:[ // comments is array of all the comment posted
    { // to link post each comment
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);
module.exports = Post;


