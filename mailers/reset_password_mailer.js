const nodeMailer = require('../config/nodemailer');

module.exports.reset = function(user,token){
    let htmlString = nodeMailer.renderTemplate({token:token},'/password/reset_password.ejs');
    nodeMailer.transporter.sendMail({
        from:'mahtok422@gmail.com',
        to:user.email,
        subject:'Reset Password',
        html:htmlString
    },function(err,info){
        if(err){
            console.log(`error in sending mail ${err}`);
            return;
        }
        //console.log('Message Sent!!!',info);
    })
}