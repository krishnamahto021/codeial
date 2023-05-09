const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user.id
        });

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: 'Post Created!!!'
            })
        }

        req.flash('success', 'Posted! successfully')
        return res.redirect('back');
    } catch (err) {
        // console.log('error in posting');
        req.flash('error', err);
        return res.redirect('back');
    }
}


// to delete the post and all the comments related to it
module.exports.destroy = async function (req, res) {
    let post = await Post.findById(req.params.id);
    try {
        // .id converts object id into string which makes us easy for comparison

        if (post.user == req.user.id) { // to authenticate whether the one who is trying to delete post is same as the one who created the post
            post.deleteOne();
            // post.remove(); is not working
            await Comment.deleteMany({ post: req.params.id });

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:'post deleted'
                });
            }

 



            req.flash('success', 'Post and its associated comments deleted successfully!!')
        }
        return res.redirect('back');
    } catch (err) {
        // console.log('error in destroying post and its comment',err);
        req.flash('error', err);
        return res.redirect('back');
    }

}