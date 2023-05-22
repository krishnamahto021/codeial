const mongoose = require('mongoose');
const Like = require('./like');


const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: { // to link which user has commented
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: { // to link the user to which the post he commented
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;