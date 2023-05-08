const User = require('../models/user');
// to render profile page
module.exports.profile = async function(req,res){
  try{
    let user = await User.findById(req.params.id);    
    return res.render('user_profile',{
        title:'users',
        user_profile:user
    });
  }catch(err){

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
  try{
    if(req.user.id == req.params.id){ // the user who is signed is same as the user who is trying to update details
      let user = await User.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        email:req.body.email
      });
      return res.redirect('back');
    }

  }catch(err){
    window.alert('You are not authorized to update');
  }
}




// to fetch data from sign in form
module.exports.createSession = function(req,res){
  req.flash('success','Logged in successfully!!');
  return res.redirect('/');
    
}

// to signout
module.exports.destroySession = function(req,res){
  req.logout(function(err){
    req.flash('error','Something Went Wrong!!');
  });
  req.flash('success','Logged out successfully!!');
  return res.redirect('/');
}