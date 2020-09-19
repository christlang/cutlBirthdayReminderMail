/**
 * Checking if a birthday arrived
 */
class DateChecker {

    getToday() {
        const today = new Date();

        const day = today.getDate();
        const month = today.getMonth() + 1; // month is starting with 0 - January
        const year = today.getFullYear();

        return `${day}.${month}.${year}`;
    }

    getDiffInDays(date1, date2) {
        const thisYear = new Date().getFullYear();

        const DAY = 0;
        const Month = 1;
        const partsDateOne = date1.split('.');
        const partsDateTwo = date2.split('.');

        const d1 = new Date(thisYear, Number(partsDateOne[Month]) -1, partsDateOne[DAY]);
        const d2 = new Date(thisYear, Number(partsDateTwo[Month]) -1, partsDateTwo[DAY]);

        const diffInMilliseconds = d2 - d1;
        return diffInMilliseconds / 60 / 60 / 24 / 1000;
    }

    /**
     * Returns if birthday is today or not.
     *
     * @param today
     * @param birthday
     * @return {boolean}
     */
    isBirthdayToday(today, birthday) {
        if (!today || !birthday) {
            console.log(`undefined inputs: ${today} / ${birthday}`);
            return false;
        }
        const DAY = 0;
        const Month = 1;
        const partsToday = today.split('.');
        const partsBirthday = birthday.split('.');

        if (Number(partsToday[DAY]) === Number(partsBirthday[DAY]) &&
            Number(partsToday[Month]) === Number(partsBirthday[Month])) {
            return true;
        }
        return false;
    }
}

module.exports = DateChecker;