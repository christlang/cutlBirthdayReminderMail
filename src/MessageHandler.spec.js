const MessageHandler = require('./MessageHandler');

describe('MessageHandler', () => {

    const birthdayChild = {
        name: 'b-name',
        birthday: 'b-birthday',
        email: 'b-email'
    };

    const receiver = {
        name: 'r-name',
        birthday: 'r-birthday',
        email: 'r-email'
    };

    const reminderDays = 7;

    describe('render', () => {
        let cut;

        beforeEach(() => {
            cut = new MessageHandler(birthdayChild, receiver, reminderDays);
        });

        it('without substituion', () => {
            expect(cut.render('abc')).toBe('abc');
        });

        it('replace {birthdayChild.name}', () => {
            expect(cut.render('abc {birthdayChild.name}'))
                .toEqual('abc b-name');
        });

        it('replace 2x {birthdayChild.name}', () => {
            expect(cut.render('abc {birthdayChild.name} /// {birthdayChild.name}'))
                .toEqual('abc b-name /// b-name');
        });

        it('replace {receiver.name}', () => {
            expect(cut.render('abc {receiver.name}'))
                .toEqual('abc r-name');
        });

        it('replace {reminderDays}', () => {
            expect(cut.render('abc {reminderDays}'))
              .toEqual('abc 7');
        });
    });

});