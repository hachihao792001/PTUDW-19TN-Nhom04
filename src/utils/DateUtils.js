class DateUtils {
    // both inclusive
    daysBetween(startDate, endDate) {
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(
            Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
        );
        return diffDays + 1;
    }

    makeArrayOfDateStrings(startDate, endDate) {
        const arrayOfDateStrings = [];
        const count = this.daysBetween(startDate, endDate);

        for (let i = 0; i < count; i++) {
            const thisDate = new Date(startDate);
            thisDate.setDate(startDate.getDate() + i);
            arrayOfDateStrings.push(thisDate.toLocaleDateString(
                "vi-VN"
            ));
        }

        return arrayOfDateStrings;
    }

    isSameDate(date1, date2) {
        return (
            date1.getFullYear() == date2.getFullYear() &&
            date1.getMonth() == date2.getMonth() &&
            date1.getDate() == date2.getDate()
        );
    }
}

module.exports = new DateUtils();