const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.objectId
    },
    // this defines the object id of liked objects
    likeable:{
        type:mongoose.Schema.objectId,
        required:true,
        refPath:'onModel'
    },
    // this field is used for defining the type of liked objects
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment'] // enum restricts it so that the likes can be placed to a post or a comment only 
    }
});

const Like = mongoose.model('Like',likeSchema);
module.exports = Like;