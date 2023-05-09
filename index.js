const express = require('express');// require library
const cookieParser = require('cookie-parser');
const app = express(); // calling express server
const port = 8000;  // defining port for the server
const db = require('./config/mongoose');


// we require SASS and setup because we want to load it before express server starts
// when we need to define or simply restart sass again then we need to write npm run scss

// set up the express session and passport
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');



// to set layout
const expressLayouts = require('express-ejs-layouts');
const { urlencoded } = require('express');
app.use(expressLayouts);


// to use cookie parser
app.use(urlencoded());
app.use(cookieParser());

// to set style and scripts automatically from assets folder using layouts
app.use(express.static('./assets'));

// make the uploads folder or route available to browser
app.use('/uploads',express.static(__dirname+'/uploads'));


// to set view engine
app.set('view engine','ejs'); 
app.set('views','./views');


app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


// to set mongo store
const MongoStore = require('connect-mongo');

// setup the session using mongo store
app.use(session({
    name:'codeial',
    secret:'somethingblah',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*80*100)
    },
    store: new MongoStore ({
        mongoUrl:'mongodb://127.0.0.1/codeial_db',        
    },
        {
            mongooseConnection:db,
            autoRemove:'disabled'
        },function(err){
            console.log(err || 'successfully added mongostore')
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// we set the flash message just after the cookie session as flash messages are passsed with every cookie
const flash = require('connect-flash');
app.use(flash());




// middleware so that for each req,res cycle we don't need to pass
const customMware = require('./config/middleware');
app.use(customMware.setFlash);



// use route
app.use('/',require('./routes')); // any request coming to the web will go to routes



app.listen(port,function(err){
    if(err){
        // console.log('error in running Server ',err);
        console.log(`error in running Server ${err}`);// by interpolation
    }
    console.log(`Server is running on port : ${port}`);
})