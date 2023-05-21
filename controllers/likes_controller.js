const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');


module.exports.toggleLike = async function(req,res){
    try{
        // url of like : likes/toggle/?id=adhfoaig&type=Post(or Comment)
        let likeable;
        let deleted = false;
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Post.findById(req.query.id).populate('likes');
        }


        // check if existing like is there or not
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        });

        if(existingLike){ // if like exists pull out from the database
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.deleteOne();
            deleted=true;
        }else{
            let newLike = await Like.create({
                likeable:req.query.id,
                onModel:req.query.type,
                user:req.user._id
            });

            likeable.likes.push(newLike._id);
            likeable.save();

        }

        return res.json(200,{
            message:'Liked!!',
            data:{
                deleted:deleted
            }
        })




    }catch(err){
        console.log(err);
        req.flash('error','Internal Server Error');
        return res.json(500,{
            message:'Internal Server error!!'
        })
    }

}