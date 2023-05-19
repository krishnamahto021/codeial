const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const resetPasswordMailer = require('../mailers/reset_password_mailer');

// to render profile page
module.exports.profile = async function(req,res){
  try{
    let user = await User.findById(req.params.id);    
    return res.render('user_profile',{
        title:'users',
        user_profile:user
    });
  }catch(err){
    console.log('error in rendering profile',err);
    return;
  }
}

// to render sign in page
module.exports.signIn = function(req,res){
    // if user is already signed in don't show the signin page rather show profile page
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }


    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    });
}

// to render sign up page
module.exports.signUp = function(req,res){
  // if user is already signed in don't show the signup rather show profile page
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  
    return res.render('user_sign_up',{
        title:'Codeial | Sign Up'
    });
}

// to fetch data from sign up form

module.exports.create = async function(req, res) {
  try {
    if (req.body.password !== req.body.confirm_password) {
      return res.redirect('back');
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) { // if user doesnot exist
      const newUser = await User.create(req.body);
      return res.redirect('/users/sign-in');
    } else { // if user exist
      return res.redirect('back');
    }
  } catch (err) {
    console.log(`error in finding user in signing up ${err}`);
    return;
  }
};

// to update user
module.exports.update = async function(req,res){
  // try{
  //   if(req.user.id == req.params.id){ // the user who is signed is same as the user who is trying to update details
  //     let user = await User.findByIdAndUpdate(req.params.id,{
  //       name:req.body.name,
  //       email:req.body.email
  //     });
  //     return res.redirect('back');
  //   }

  // }catch(err){
  //   window.alert('You are not authorized to update');
  // }

  
  if(req.user.id == req.params.id){
    try{
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req,res,function(err){ // uploadedAvatar helps us to read data from multipart form
        if(err){
          console.log('error in multer',err);
        }
        user.name = req.body.name;
        user.email = req.body.email;

        if(req.file){

          // to check whther the file is uploaded multiple times or not in the avatars
          if(user.avatar && fs.existsSync(__dirname + '..' + user.avatar)){
            fs.unlinkSync(path.join(__dirname + '..' + user.avatar));
          }

          // this is for saving the path of uploaded file into avatar field of user
          user.avatar = User.avatarPath + '/' + req.file.filename;
        }
        user.save();
        return res.redirect('back');
      })

    }catch(err){
      req.flash('unauthorized',err);
      return res.redirect('back');
    }
  }
}




// to fetch data from sign in form
module.exports.createSession = function(req,res){
  req.flash('success','Logged in successfully!!');
  return res.redirect('/');
    
}


// to forget or reset password

// show the form for reseting password
module.exports.forgetPassword = function(req,res){
  return res.render('forget_password',{
    title:'Reset Password',
  });
}

// to reset the password
module.exports.resetPassword = async function(req,res){
  try{
  let user = await User.findOne({email:req.body.email});
  if(user){
    const randomString = crypto.randomBytes(20).toString('hex');
    user.token = randomString;
    //console.log(user);
    user.save();
    resetPasswordMailer.reset(user,randomString);
    req.flash('success','Reset email sent');
    return res.redirect('/');
     
  }
  }catch(err){
    console.log('error in reseting passwword',err);
  }
}

// to verify token
module.exports.forgetPasswordLoad = async function(req,res){
  try{
    let token = req.query.token;
    console.log(token);
    //const user = await User.findOne({token:req.query.token}) ;// user with the token exists
    let user = await User.findOne({token:token});
    console.log(user.token);
    if(user){
      return res.render('reset_password',{
        title:'reset Password',
        user_id:user._id // to verify the user
      });
    }else{
      //window.alert('Unauthorized !!');
      req.flash('error','unauthorized user');
      return res.redirect('/');
    }

  }catch(err){
    console.log('error in verifying token',err);
  }
}

// to update password by the user
module.exports.updatePassword = async function(req,res){
  try{
  let user = await User.findById(req.body.user_id);
  user.password = req.body.password;
  user.save();
  console.log(user.password);
  req.flash('success','Password Updated Successfully!');
  return res.redirect('/users/sign-in');
  }catch(err){
    console.log(`error in updating password ${err}`);
  }
}


// to signout
module.exports.destroySession = function(req,res){
  req.logout(function(err){
    req.flash('error','Something Went Wrong!!');
  });
  req.flash('success','Logged out successfully!!');
  return res.redirect('/');
}