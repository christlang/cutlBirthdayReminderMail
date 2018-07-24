
class MessageHandler {

    constructor(birthdayChild, receiver) {
        this.birthdayChild = birthdayChild;
        this.receiver = receiver;
    }

    replacer(attribute, template) {
        let adjustedTemplate = template;
        Object.keys(this[attribute]).forEach(element => {
            const target = `{${attribute}.${element}}`;
            const replacement = this[attribute][element];
            console.log(`${target} -> ${replacement}`);
            adjustedTemplate = adjustedTemplate
                .split(target)
                .join(replacement);
        });
        return adjustedTemplate;
    }

    render(template) {
        let replacement = this.replacer('birthdayChild', template);
        return this.replacer('receiver', replacement);
    }
}

module.exports = MessageHandler;