const Post = require('../models/post');

//populate the user of each post
module.exports.home = async function (req, res) {
    const posts = await Post.find({})
    .populate('user')
    .populate({
        path:'comments', // schema of post main comments hain
        populate:{
            path:'user' // schema of post main user hain
        }
    })

    try {

        return res.render('home', {
            title: "Codeial | Home",
            posts:posts
        })

    }catch(err){
        console.log('error in fetching posts',err);
        return;
    }


}