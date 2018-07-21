const DateChecker = require('./DateChecker');

describe('DateChecker', () => {

    let cut;

    beforeEach(() => {
        cut = new DateChecker();
    });

    test('adds 1 + 2 to equal 3', () => {
        expect(cut.sum(1, 2)).toBe(3);
    });
});