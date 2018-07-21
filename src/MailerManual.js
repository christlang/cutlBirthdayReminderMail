const Mailer = require('./Mailer');

const smtpConfig = require('../config/mail.json');
const message = require('../config/message.json');

const mailer = new Mailer(smtpConfig);
mailer.verify().then(() => {
    console.log('verification of config was okay');
    return mailer.sendMail(message);
}).then(() => {
    console.log('verification of sending message');
});