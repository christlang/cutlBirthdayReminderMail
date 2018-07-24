const DateChecker = require('./src/DateChecker');
const Mailer = require('./src/Mailer');
const MessageHandler = require('./src/MessageHandler');
const Reminder = require('./src/Reminder');

const smtpConfig = require('./config/mail.json');
const messageTemplate = require('./config/message.json');
const personList = require('./config/list.json').persons;

const dateChecker = new DateChecker();
const mailer = new Mailer(smtpConfig);
const reminder = new Reminder(dateChecker);

const today = dateChecker.getToday();
const birthdayChildren = reminder.getBirthdayChilds(personList, today);

const args = process.argv.splice(2);
const dryRun = args[0] === '--dryRun';

birthdayChildren.forEach(child => {
    const listToSendTo = reminder.getWishers(personList, child);

    listToSendTo.reduce((all, wisher) => {
        const email = wisher.email;
        const name = wisher.name;

        const msgHandler = new MessageHandler(child, wisher);

        const message = Object.assign({}, messageTemplate);
        message.to = email;
        message.subject = msgHandler.render(message.subject);
        message.text = msgHandler.render(message.text);

        console.log(`Send mail to ${name} / ${email} for ${child.name}`);

        if (dryRun) {
            return all.then(() => console.log(message));
        } else {
            return all.then(() => mailer.sendMail(message));
        }
    }, Promise.resolve());
});
