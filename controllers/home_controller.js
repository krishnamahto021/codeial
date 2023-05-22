const Post = require('../models/post');
const User = require('../models/user');

//populate the user of each post
module.exports.home = async function (req, res) {
    const posts = await Post.find({})
    .sort('-createdAt') // to sort the post i.e. the post which posted lateer will be shown first
    .populate('user')
    .populate({
        path:'comments', // schema of post main comments hain
        populate:{
            path:'user' // schema of post main user hain
        },
        populate:{ // change : populating likes for comments of post
            path:'likes'
        }
    }).populate('likes'); // change : populating likes for post 

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