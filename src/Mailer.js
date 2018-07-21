const nodemailer = require('nodemailer');
const smtpConfig = require('../config/mail.json');
const message = require('../config/message');


const transporter = nodemailer.createTransport(smtpConfig);

// verify connection configuration
transporter.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});


transporter.sendMail(message, function(err){
    if(err){
        // check if htmlstream is still open and close it to clean up
        console.log(`e-mail sending had an error: ${err}`);
    }
    console.log('e-mail sent');
});