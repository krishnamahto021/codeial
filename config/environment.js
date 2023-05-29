const morgan  = require('morgan');
const rfs = require('rotating-file-stream');
const fs = require('fs');
const path = require('path');
const logDirectory = path.join(__dirname,'../productionLogs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory); // checks if the logdirectory exists if its exists no worry else create it

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});


const development = {
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'somethingblah',
    db:'codeial_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:({
            user:'krishna.coding.ninjas01@gmail.com',
            pass:'yixliqbhqxtalqxe'
        })
    },
    google_clientID:'15098916937-p7qq04kehn4dqamb27u0ds8br7m6rda6.apps.googleusercontent.com',
    google_clientSecret:'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',
    google_callbackURL:'http://localhost:8000/users/auth/google/callback',
    jwt_secret_or_key:'codeial',
    morgan:{
        mode:'dev',
        options:{
            stream:accessLogStream
        }
    }
}


const production ={
    name:'production',
    asset_path:process.env.CODEIAL_ASSET_PATH,
    session_cookie_key:process.env.session_cookie_key,
    db:process.env.db,
    smtp:{
        service:process.env.smtp_service,
        host:process.env.smtp_host,
        port:587,
        secure:false,
        auth:({
            user:process.env.smtp_auth_user,
            pass:process.env.smtp_auth_pass
        })
    },
    google_clientID:process.env.google_clientID,
    google_clientSecret:process.env.google_clientSecret,
    google_callbackURL:process.env.google_callbackURL,
    jwt_secret_or_key:process.env.jwt_secret_or_key,
    morgan:{
        mode:'combined',
        options:{
            stream:accessLogStream
        }
    }


}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development :eval(process.env.CODEIAL_ENVIRONMENT);