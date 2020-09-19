
class MessageHandler {

    constructor(birthdayChild, receiver, reminderDays) {
        this.birthdayChild = birthdayChild;
        this.receiver = receiver;
        this.reminderDays = reminderDays;
    }

    replacer(attribute, template) {
        let adjustedTemplate = template;
        if (Object.keys(this[attribute]).length === 0) {
            adjustedTemplate = adjustedTemplate
              .split(`{${attribute}}`)
              .join(this[attribute]);
        } else {
            Object.keys(this[attribute]).forEach(element => {
                const target = `{${attribute}.${element}}`;
                const replacement = this[attribute][element];
                //console.log(`${target} -> ${replacement}`);
                adjustedTemplate = adjustedTemplate
                  .split(target)
                  .join(replacement);
            });
        }

        return adjustedTemplate;
    }

    render(template) {
        let replacementBirthdayChild = this.replacer('birthdayChild', template);
        let replacementReceiver = this.replacer('receiver', replacementBirthdayChild);
        return this.replacer('reminderDays', replacementReceiver);
    }
}

module.exports = MessageHandler;