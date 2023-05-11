const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){

    const posts = await Post.find({})
    .sort('-createdAt') // to sort the post i.e. the post which posted lateer will be shown first
    .populate('user')
    .populate({
        path:'comments', // schema of post main comments hain
        populate:{
            path:'user' // schema of post main user hain
        }
    })



    return res.json(200,{
        message:'list of posts',
        posts:posts
    })
};


// to delete the post and all the comments related to it
module.exports.destroy = async function (req, res) {

    try {
        // .id converts object id into string which makes us easy for comparison
        let post = await Post.findById(req.params.id);

       // if (post.user == req.user.id) { // to authenticate whether the one who is trying to delete post is same as the one who created the post
            post.deleteOne();
            // post.remove(); is not working
            await Comment.deleteMany({ post: req.params.id });

            // if(req.xhr){
            //     return res.status(200).json({
            //         data:{
            //             post_id:req.params.id
            //         },
            //         message:'post deleted'
            //     });
            // }

            // req.flash('success', 'Post and its Associated comments deleted successfully!!');
            // return res.redirect('back');

            return res.json(200,{
                message:'posts and its comments deleted Successfully!!'
            })
    // }

    } catch (err) {
        // console.log('error in destroying post and its comment',err);
        // req.flash('error', err);
        return res.json(500,{
            message:'Internal server Error'
        });
    }
}



