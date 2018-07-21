const nodemailer = require('nodemailer');

class Mailer {

    constructor(smtpConfig) {
        this.transporter = nodemailer.createTransport(smtpConfig);
    }

    /**
     * verifies smtpConfig
     *
     * @return {Promise<any>}
     */
    verify() {
        return new Promise((resolve, reject) => {
            // verify connection configuration
            this.transporter.verify(function(error, success) {
                if (error) {
                    console.log(error);
                    reject(error);

                } else {
                    console.log('Server is ready to take our messages');
                    resolve(success);
                }
            });
        });
    }

    /**
     * sends message.
     *
     * @param message
     * @return {Promise<any>}
     */
    sendMail(message) {
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(message, function(err){
                if(err){
                    // check if htmlstream is still open and close it to clean up
                    console.log(`e-mail sending had an error: ${err}`);
                    reject(err);
                } else {
                    console.log('e-mail sent');
                    resolve();
                }
            });
        });
    }
}

module.exports = Mailer;


