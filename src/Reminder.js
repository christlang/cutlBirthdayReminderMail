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
     * Returns the birthday-children in today+reminderDays days.
     *
     * @param list
     * @param today
     * @param reminderDays
     * @returns {Array}
     */
    getReminderForBirthdayChildren(list, today, reminderDays) {
        return list.filter(person => {
            if (this.dateChecker.getDiffInDays(today, person.birthday) === reminderDays) {
                console.log(`birthdayReminder: ${JSON.stringify(person)} for reminderDays: ${reminderDays}`);
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