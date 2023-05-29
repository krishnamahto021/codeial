const nodeMailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const env = require('./environment');

let transporter = nodeMailer.createTransport(env.smtp);

let renderTemplate = (data,relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log(`error in rendering template${err}`);
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
};