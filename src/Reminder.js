/**
 * Reminder has an eye on the person list.
 */
class Reminder {

    constructor(dateChecker) {
        this.dateChecker = dateChecker;
    }

    /**
     * returns everyone who has birthday today.
     *
     * @param today
     * @param list
     * @return {Array}
     */
    getBirthdayChilds(list, today) {
        return list.filter(person => {
            if (this.dateChecker.isBirthdayToday(today, person.birthday)) {
                console.log(`birthday: ${JSON.stringify(person)}`);
                return true;
            }
            return false;
        });
    }

    /**
     * Returns list of wishers.
     *
     * @param list
     * @param birthdayChild
     */
    getWishers(list, birthdayChild) {
        const stringifedBirthdayChild = JSON.stringify(birthdayChild);
        return list.filter(person => {
            if (JSON.stringify(person) === stringifedBirthdayChild) {
                // should not wish himself
                return false;
            }
            return true;
        });
    }
}

module.exports = Reminder;