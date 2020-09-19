const DateChecker = require('./DateChecker');

describe('DateChecker', () => {

    let cut;
    const today = new DateChecker().getToday();

    beforeEach(() => {
        cut = new DateChecker();
    });

    describe('isBirthdayToday', () => {

        [
            { today: '21.07.2018', birthday: '21.07.2018', expected: true,
                comment: 'same day'},
            { today: '21.07.2018', birthday: '21.7.2018', expected: true,
                comment: 'same day diffrent writings'},
            { today: '21.07.2018', birthday: '21.08.2018', expected: false,
                comment: 'same day, different month'},
            { today: '', birthday: '21.08.2018', expected: false,
                comment: 'wrong input for today'},
            { today: '21.08.2018', birthday: '', expected: false,
                comment: 'wrong input for today'},
            { today: today, birthday: today, expected: true,
                comment: 'today is birthday'},
            { today: null, birthday: undefined, expected: false,
                comment: 'wrong inputs'},
        ].forEach(args => {
            test(`today is ${args.today} - ` +
                `birthday ${args.birthday} ` +
                `-> isBirthday: ${args.expected} (${args.comment})`, () => {
                const today = args.today;
                const birthday = args.birthday;
                expect(cut.isBirthdayToday(today, birthday)).toBe(args.expected);
            });
        });
    });

    describe('getDiff', () => {
        it('NaN will be returned -> no error handling at the moment', () => {
           expect(cut.getDiffInDays('', '')).toBe(NaN);
        });

        it('first date before second', () => {
            expect(cut.getDiffInDays('01.01.2020', '02.01.2020')).toBe(1);
        });

        it('first date before second longer time', () => {
            expect(cut.getDiffInDays('01.01.2020', '01.02.2020')).toBe(31);
        });

        it('second date before first', () => {
            expect(cut.getDiffInDays('02.01.2020', '01.01.2020')).toBe(-1);
        });

        it('first date before second and different years', () => {
            expect(cut.getDiffInDays('01.01.2019', '02.01.2020')).toBe(1);
        });
    });
});