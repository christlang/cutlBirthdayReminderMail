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
const reminderDays = messageTemplate.reminderDays;
const birthdayChildren = reminder.getBirthdayChilds(personList, today);
const reminderForBirthdays = reminder.getReminderForBirthdayChildren(personList, today, reminderDays);

const args = process.argv.splice(2);
const dryRun = args[0] === '--dryRun';

const sendMailIfNeeded = (child, subject, text, html) => {
    const listToSendTo = reminder.getWishers(personList, child);

    listToSendTo.reduce((all, wisher) => {
        const email = wisher.email;
        const name = wisher.name;

        if (email === '') {
            console.log('wisher has no email ', wisher);
            return all;
        }

        const msgHandler = new MessageHandler(child, wisher, reminderDays);

        const message = {};
        message.to = email;
        message.from = messageTemplate.from;
        message.subject = msgHandler.render(subject);
        message.text = msgHandler.render(text);
        message.html = msgHandler.render(html);

        console.log(`Send mail to ${name} / ${email} for ${child.name}`);

        if (dryRun) {
            return all.then(() => console.log(message));
        } else {
            return all.then(() => mailer.sendMail(message));
        }
    }, Promise.resolve());
};

birthdayChildren.forEach(child => {
    const {subject, text, html} = messageTemplate.birthdayMail;
    sendMailIfNeeded(child, subject, text, html);
});

reminderForBirthdays.forEach(child => {
    const {subject, text, html} = messageTemplate.reminderMail;
    sendMailIfNeeded(child, subject, text, html);
});