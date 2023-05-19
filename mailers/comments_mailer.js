const nodeMailer = require('../config/nodemailer');

module.exports.newComment = function(comment){
    //console.log(`inside new comment mailer ${comment}`);
    let htmlString = nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from:'mahtok422@gmail.com',
        to: comment.user.email,
        subject:'New!! comment published!!',
        //html:'<h1>Yup!!! your comment is now published!! </h1>'
        html:htmlString
    },function(err,info){
        if(err){
            console.log(`error in sending mail ${err}`);
            return;
        }
        console.log('Message Sent!!!',info);
    })
}