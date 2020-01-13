const DAYS_IN_WEEK = 7;

/**
 * Sets date to midnight
 * @param {Date} date
 * @returns {Date}
 */
function setToMidnight(date) {
    const newDate = new Date(date);
    newDate.setHours(0);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    return newDate;
}

/**
 * Returns today date with midnight time
 * @returns {Date}
 */
function getToday() {
    return setToMidnight(new Date());
}

/**
 * Checks if a date is today
 * @param {Date} date
 * @returns {boolean}
 */
function isToday(date) {
    const dayDate = setToMidnight(date);
    return dayDate.getTime() === getToday().getTime();
}

/**
 * Checks if a date is from the past
 * @param {Date} date
 * @returns {boolean}
 */
function isFromPast(date) {
    return date < getToday();
}

/**
 *
 * @param {Date} date
 * @param {Date} dateFrom
 * @param {Date} dateTo
 * @returns {boolean}
 */
function isInRange(date, dateFrom, dateTo) {
    if (dateFrom === null && dateTo === null) {
        return false;
    }

    if (dateFrom !== null && date < dateFrom) {
        return false
    }

    if (dateTo !== null && date > dateTo) {
        return false;
    }

    return true;
}

/**
 * Returns number of days in month of given date
 * @param {Date} date
 * @returns {number}
 */
function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Returns date of first day in month of given date
 * @param {Date} date
 * @returns {Date}
 */
function getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Returns number of full weeks in month of given date
 * @param {Date} date
 * @returns {number}
 */
function getFullWeeksInMonth(date) {
    return Math.ceil((getDaysInMonth(date) + getFirstDayOfMonth(date).getDay()) / DAYS_IN_WEEK);
}

export {
    DAYS_IN_WEEK,
    isToday,
    getToday,
    isFromPast,
    setToMidnight,
    isInRange,
    getDaysInMonth,
    getFullWeeksInMonth,
    getFirstDayOfMonth
}