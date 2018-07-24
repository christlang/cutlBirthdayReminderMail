const DateChecker = require('./src/DateChecker');
const Mailer = require('./src/Mailer');
const Reminder = require('./src/Reminder');

const smtpConfig = require('./config/mail.json');
const message = require('./config/message.json');
const personList = require('./config/list.json').persons;

const dateChecker = new DateChecker();
const mailer = new Mailer(smtpConfig);
const reminder = new Reminder(dateChecker);

const today = dateChecker.getToday();
const birthdayChildren = reminder.getBirthdayChilds(personList, today);

birthdayChildren.forEach(child => {
    const listToSendTo = reminder.getWishers(personList, child);

    listToSendTo.reduce((all, wisher) => {
        const email = wisher.email;
        const name = wisher.name;

        message.to = email;
        message.subject = `Remember birthday of ${child.name}`;
        message.text += ` - to: ${name}`;

        console.log(`Send mail to ${name} / ${email} for ${child.name}`);

        return all.then(() => mailer.sendMail(message));
    }, Promise.resolve());
});
