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