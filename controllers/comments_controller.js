const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){
    let post = await Post.findById(req.body.post);
    if(post){
        let comment = await Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        });

        try{ // if comment is created we update it into data base and save it
            post.comments.push(comment);
            // await  comment.save();
            post.save();
            req.flash('success','Commented Successfully!!');
            return res.redirect('/');

        }catch(err){
            // console.log('error in commenting',err);
            req.flash('error',err);
            return;
        }
    }
}

// module.exports.destroy = async function(req,res){
//     let comment = await Comment.findById(req.params.id);
//     try{
//         if(comment.user == req.user.id){
//             let postId = comment.post;
//             comment.remove();

//             let post = await Post.findByIdAndUpdate(postId,{$pull :{comments:req.params.id}});
//             // console.log(post);
//             // try{
//             //     return res.redirect('back');
//             // }catch(err){
//             //     return res.redirect('back');
//             // }
//         }
//     }catch(err){
//         return res.redirect('back');
//     }
// }

module.exports.destroy = async function(req, res){
    try {
      const comment = await Comment.findById(req.params.id);
      
      if (comment.user == req.user.id){
        const postId = comment.post;
        
        await comment.deleteOne();
        
        const post = await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
        
        req.flash('success','Comment deleted successfully!!');
        return res.redirect('back');
      } else {
        return res.redirect('back');
      }
    } catch(err) {
      // console.error(err);
      req.flash('error',err);
      return res.redirect('back');
    }
  }
  
