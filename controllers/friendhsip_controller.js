const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.toggleFriendship = async function(req,res){
    try{
        // url : /friends/toggle/:id
        let fromUser = req.user;
        let toUser = await User.findById(req.params.id);
        let friend = false;
        // console.log(fromUser);
        // console.log(toUser);
        
        // check if friendship exists
        const existingFriendship = await Friendship.findOne({
            from_user:fromUser.id,
            to_user:toUser.id
        });
        // console.log(existingFriendship);
        //if exists delete it
        if(existingFriendship){
            fromUser.friendship.pull(toUser.id);
            await fromUser.save();
            toUser.friendship.pull(fromUser.id);
            await toUser.save();
            await existingFriendship.deleteOne();
            // console.log(friend);

            if(req.xhr){
                // req.flash('success','unfollowed!!');
            return res.json(200,{
                message:'Friendship removed successfully',
                data:{
                    friend:friend
                }
            })
        }
        }
        // if doesnot exists create a new friendship
        else{
            const newFriendship = await Friendship.create({
                from_user:fromUser.id,
                to_user:toUser.id
            });
            fromUser.friendship.push(toUser.id);
            await fromUser.save();
            toUser.friendship.push(fromUser.id);
            await fromUser.save();
            friend= true;
            // console.log(fromUser.friendhship,toUser.friendhship);
            if(req.xhr){
            // req.flash('success','Followed!!');
            return res.json(200,{
                message:'Freindship created successfully!',
                data:{
                    friend:friend
                }
            })
        }
        }
    }catch(err){
        return res.json(500,{
            message:'Request not Completed!'
        })
    }
}