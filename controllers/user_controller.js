const User = require('../models/user');
// to render profile page
module.exports.profile = function(req,res){
    
    return res.render('user_profile',{
        title:'users'
    });
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




// to fetch data from sign in form
module.exports.createSession = function(req,res){
  return res.redirect('/');
    
}

// to signout
module.exports.destroySession = function(req,res){
  req.logout(function(err){
    if(err){
      console.log('error in logging out ')
    }
  });
  return res.redirect('/');
}