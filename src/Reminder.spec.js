const Reminder = require('./Reminder');
const DateChecker = require('./DateChecker');

describe('Reminder', () => {

    let cut;
    const today = new DateChecker().getToday();

    beforeEach(() => {
        cut = new Reminder(new DateChecker());
    });

    /**
     * creates person with birthday.
     *
     * @param birthday
     * @return {{name: string, birthday: *, email: string}}
     */
    function createPerson(birthday) {
        return {name: '', birthday, email: ''};
    }

    describe('getBirthdayChilds', () => {
        test('empty ist returns empty list', () => {
            expect(cut.getBirthdayChilds([], '21.07.2018'))
                .toEqual([]);
        });

        test('find one in list', () => {
            const birthdayChild = createPerson(today);
            const list = [];
            list.push(birthdayChild);
            list.push(createPerson('01.01.2019'));
            expect(cut.getBirthdayChilds(list, today))
                .toEqual([birthdayChild]);
        });

        test('find two in list', () => {
            const birthdayChild = createPerson(today);
            const list = [];
            list.push(birthdayChild);
            list.push(createPerson('01.02.2019'));
            list.push(birthdayChild);
            list.push(createPerson('01.01.2019'));
            expect(cut.getBirthdayChilds(list, today))
                .toEqual([birthdayChild, birthdayChild]);
        });
    });

    describe('getWishers', () => {

        test('birthday child is alone', () => {
            const birthdayChild = createPerson(today);
            const list = [];
            list.push(birthdayChild);

            expect(cut.getWishers(list, birthdayChild)).toEqual([]);
        });

        test('birthday child has 3 wishers', () => {
            const birthdayChild = createPerson(today);
            const wisherOne = createPerson('21.07.2018');
            const wisherTwo = createPerson('23.07.2018');
            const list = [];
            list.push(birthdayChild);
            list.push(wisherOne);
            list.push(wisherTwo);

            expect(cut.getWishers(list, birthdayChild))
                .toEqual([wisherOne, wisherTwo]);
        });
    });
});