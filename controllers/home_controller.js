const Post = require('../models/post');
const User = require('../models/user');

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
        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts:posts,
            all_users:users
        })

    }catch(err){
        console.log('error in fetching posts',err);
        return;
    }


}