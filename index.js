const express = require('express');// require library
const env = require('./config/environment');// to set the enviornment variable for dev and prod mode
const logger = require('morgan');
console.log(env)

// to set up the corse for using chat and we have used this is the chat_sockets.js
const cors = require('cors');

const cookieParser = require('cookie-parser');
const app = express(); // calling express server

require('./config/views_helpers')(app);

const port = 8000;  // defining port for the server
const db = require('./config/mongoose');
const flash = require('connect-flash');



// to set layout
const expressLayouts = require('express-ejs-layouts');
const { urlencoded } = require('express');

// middleware so that for each req,res cycle we don't need to pass
const customMware = require('./config/middleware');

// to set mongo store
const MongoStore = require('connect-mongo');

// to set node sass
// const sassMiddleware = require('node-sass-middleware');

// set up the express session and passport
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// for passport-jwt strategy
const passportJwt = require('./config/passport-jwt-strategy');

// for google-o-Auth
const passportGoogle = require('./config/passport-google-oauth-2-strategy');


// we require SASS and setup because we want to load it before express server starts
// when we need to define or simply restart sass again then we need to write npm run scss




// using cors to setup the chatbox
// app.use(cors());
  

app.use(expressLayouts);

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(3000);
console.log('chat server is listening on port 3000');



// to use cookie parser
app.use(urlencoded());
app.use(cookieParser());

// to set style and scripts automatically from assets folder using layouts

app.use(express.static(env.asset_path));

// make the uploads folder or route available to browser
app.use('/uploads',express.static(__dirname+'/uploads'));

// to use morgan or logger
app.use(logger(env.morgan.mode,env.morgan.options));


// to set view engine
app.set('view engine','ejs'); 
app.set('views','./views');


app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




// setup the session using mongo store
app.use(session({
    name:env.name,
    secret:env.session_cookie_key,
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

app.use(flash());

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