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
    jwt_secret_or_key:'codeial'
}

const production ={
    name:'production',


}

module.exports = development;