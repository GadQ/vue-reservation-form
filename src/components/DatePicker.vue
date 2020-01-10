<template>
    <div class="datepicker">
        <div class="datepicker__header">
            <button type="button" class="datepicker__month-button"  :class="{'is-disabled': !isPreviousMonthAvailable}" @click="prevMonth" :disabled="!isPreviousMonthAvailable">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 35" width="20"
                     class="datepicker__month-button-icon">
                    <path
                        d="M6.7 17.5L19.75 3.89a.89.89 0 00-.02-1.24L17.41.26a.85.85 0 00-1.22-.01L.24 16.87a.82.82 0 00-.24.63c0 .24.07.47.24.64l15.95 16.61c.33.34.88.33 1.22-.01l2.33-2.4c.34-.34.35-.9.02-1.23L6.69 17.5z"/>
                </svg>
            </button>
            <div class="datepicker__month-viewed">{{ currentMonth }}</div>
            <button type="button" class="datepicker__month-button" @click="nextMonth">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 35" width="20"
                     class="datepicker__month-button-icon">
                    <path
                        d="M13.3 17.5L.25 3.89a.89.89 0 01.02-1.24L2.59.26A.85.85 0 013.81.25l15.95 16.62c.18.17.25.4.24.63 0 .24-.07.47-.24.64L3.81 34.75a.85.85 0 01-1.22-.01l-2.33-2.4a.89.89 0 01-.02-1.23L13.31 17.5z"/>
                </svg>
            </button>
        </div>
        <div class="datepicker__body">
            <div class="datepicker__weekdays">
                <span class="datepicker__weekday">Sun</span>
                <span class="datepicker__weekday">Mon</span>
                <span class="datepicker__weekday">Tue</span>
                <span class="datepicker__weekday">Wed</span>
                <span class="datepicker__weekday">Thu</span>
                <span class="datepicker__weekday">Fri</span>
                <span class="datepicker__weekday">Sat</span>
            </div>
            <div class="datepicker__days">
                <div class="datepicker__day"
                     :class="{
                        'is-other-month': isDayFromOtherMonth(day),
                        'is-today': isToday(day),
                        'is-disabled': !isDateAvailable(day),
                        'is-marked': isMarked(day),
                        'is-first-marked': isFirstMarked(day),
                        'is-last-marked': isLastMarked(day),
                     }"
                     v-for="day in daysOfMonth" :key="day.getTime()">
                    <button type="button" class="datepicker__day-button" @click="setDate(day)" :disabled="!isDateAvailable(day)">
                        {{day.getDate()}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DatePicker',
        data: () => ({
            dateFrom: null,
            dateTo: null,
            dateShow: null,
        }),
        props: {
            dateStart: Date,
            dateEnd: Date,
            availableFrom: Date,
            availableTo: Date,
            unavailableDates: Array
        },
        computed: {
            daysOfMonth() {
                const date = new Date(this.dateShow.getTime());
                const weeks = this.fullWeeksInMonth(date);
                const daysFromSunday = date.getDay();
                date.setDate(-1 * daysFromSunday);

                const days = [];
                for (let i = 0; i < weeks * 7; i++) {
                    date.setDate(date.getDate() + 1);
                    days.push(new Date(date.getTime()));
                }

                return days;
            },
            currentMonth() {
                const formatter = new Intl.DateTimeFormat('en', {
                    month: 'long',
                    year: 'numeric'
                });
                return formatter.format(this.dateShow);
            },
            availableToDate() {
                if( this.dateFrom === null || this.dateTo !== null ) {
                    return this.availableTo;
                }

                const unavailableFrom = this.unavailableDates.reduce((arr, date) => {
                    if( this.dateFrom.getTime() < date.from.getTime()) {
                        arr.push(date.from);
                    }
                    return arr;
                }, []);

                if (unavailableFrom.length === 0) {
                    return this.availableTo;
                }

                const closestUnavailable = unavailableFrom.reduce((acc, date) => {
                    return date.getTime() < acc.getTime() ? date : acc;
                });

                if( this.availableTo == null ) {
                    return closestUnavailable;
                }
                else {
                    return this.availableTo.getTime() < closestUnavailable.getTime() ? this.availableTo : closestUnavailable;
                }
            },
            availableFromDate() {
                if( this.dateFrom === null || this.dateTo !== null ) {
                    return this.availableFrom;
                }

                const unavailableTo = this.unavailableDates.reduce((arr, date) => {
                    if( this.dateFrom.getTime() > date.to.getTime()) {
                        arr.push(date.to);
                    }
                    return arr;
                }, []);

                if (unavailableTo.length === 0) {
                    return this.availableFrom;
                }

                const closestUnavailable = unavailableTo.reduce((acc, date) => {
                    return date.getTime() > acc.getTime() ? date : acc;
                });

                if( this.availableFrom == null ) {
                    return closestUnavailable;
                }
                else {
                    return this.availableFrom.getTime() > closestUnavailable.getTime() ? this.availableFrom : closestUnavailable;
                }
            },
            isPreviousMonthAvailable() {
                const from = this.availableFrom || new Date();
                return new Date(this.dateShow.getFullYear(), this.dateShow.getMonth(), 1) > new Date(from.getFullYear(), from.getMonth(), 1)
            }
        },
        methods: {
            setDate(date) {
                if( this.dateFrom === null || this.dateTo !== null ) {
                    this.dateFrom = date;
                    this.dateTo = null;
                } else {
                    if( date.getTime() < this.dateFrom.getTime()){
                        this.dateTo = this.dateFrom;
                        this.dateFrom = date
                    }
                    else {
                        this.dateTo = date;
                    }
                }
            },
            fullWeeksInMonth(date) {
                return Math.ceil((this.daysInMonth(date) + date.getDay()) / 7);
            },
            daysInMonth(date) {
                return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            },
            nextMonth() {
                const dateNew = new Date(this.dateShow.getTime());
                dateNew.setMonth(dateNew.getMonth() + 1);
                this.dateShow = dateNew;
            },
            prevMonth() {
                const dateNew = new Date(this.dateShow.getTime());
                dateNew.setMonth(dateNew.getMonth() - 1);
                this.dateShow = dateNew;
            },
            isDayFromOtherMonth(date) {
                return date.getMonth() !== this.dateShow.getMonth();
            },
            isDateAvailable(date) {
                if (this.isDateFromPast(date)) {
                    return false;
                }

                if (this.isInUnavailableDates(date)) {
                    return false;
                }

                return this.isInRange(date, this.availableFromDate, this.availableToDate);
            },
            isInRange(date, dateFrom, dateTo) {
                const dateTime = date.getTime();

                if (dateFrom !== null && dateTime < dateFrom.getTime()) {
                    return false
                }

                if (dateTo !== null && dateTime > dateTo.getTime()) {
                    return false;
                }

                return true;
            },
            isInUnavailableDates(date) {
                if (this.unavailableDates.length === 0) {
                    return false;
                }

                return this.unavailableDates.some(dateRange => {
                    return this.isInRange(date, dateRange.from, dateRange.to);
                });
            },
            isDateFromPast(date) {
                return date.getTime() < this.getToday().getTime();
            },
            getToday() {
                const today = new Date();
                today.setHours(0);
                today.setMinutes(0);
                today.setSeconds(0);
                today.setMilliseconds(0);

                return today;
            },
            isToday(date) {
                return date.getTime() === this.getToday().getTime();
            },
            isMarked(day) {
                if( this.dateTo === null ) {
                    return false;
                }
                return this.isInRange(day, this.dateFrom, this.dateTo);
            },
            isFirstMarked(day) {
                return this.dateFrom !== null && day.getTime() === this.dateFrom.getTime();
            },
            isLastMarked(day) {
                return this.dateTo !== null && day.getTime() === this.dateTo.getTime();
            }
        },
        created() {
            this.dateFrom = this.dateStart || null;
            this.dateTo = this.dateEnd || null;

            if( this.dateFrom === null ) {
                this.dateFrom = new Date(this.dateTo);
                this.dateTo = null;
            }
            else {
                if( this.dateTo !== null && this.dateFrom.getTime() > this.dateTo.getTime()) {
                    const dateTo = new Date(this.dateTo);
                    this.dateTo = new Date(this.dateFrom);
                    this.dateFrom = dateTo;
                }
            }

            if (this.dateStart !== null) {
                this.dateShow = this.dateStart.getTime() > this.availableFrom.getTime() ? this.dateStart : this.availableFrom;
            } else {
                const today = this.getToday();
                this.dateShow = today.getTime() > this.availableFrom.getTime() ? today : this.availableFrom;
            }
        }
    }
</script>

<style lang="scss">
    $color-green: #00dbb1;
    $color-green-light: #c3fef8;

    .datepicker {
        width: 366px;

        &__header {
            background: $color-green;
            display: flex;
            align-items: center;
            color: #fff;
            height: 62px;
            padding: 0 20px;
        }

        &__month-button {
            background: none;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            transition: opacity 250ms ease-out;
            opacity: 1;

            &.is-disabled {
                opacity: 0.25;
            }
        }

        &__month-button-icon {
            fill: #444;
            width: 10px;
        }

        &__month-viewed {
            flex-grow: 1;
            text-align: center;
            font-size: 22px;
            font-weight: 600;
            letter-spacing: -0.5px;
        }

        &__body {
            background: #fff;
            padding: 20px;
            font-size: 13px;
        }

        &__weekdays {
            display: grid;
            grid-template-columns: repeat(7, 1fr);

        }

        &__weekday {
            text-align: center;
            color: #bbb;
            font-weight: 600;
        }

        &__days {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
        }

        &__day {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 6px 0;
            position: relative;
            z-index: 1;

            &.is-marked {
                background: $color-green-light;
                color: $color-green;
            }

            &.is-first-marked,
            &.is-last-marked {
                &:before {
                    content: '';
                    display: block;
                    width: 50%;
                    height: 100%;
                    position: absolute;
                    z-index: 0;
                    background: #fff;
                }
            }

            &.is-first-marked {
                &:before {
                    left: 0;
                }
            }

            &.is-last-marked {
                &:before {
                    right: 0;
                }
            }

            &.is-first-marked.is-last-marked {
                &:before {
                    width: 100%;
                }
            }

        }

        &__day-button {
            cursor: pointer;
            width: 42px;
            height: 42px;
            font-size: 13px;
            border: none;
            background: none;
            color: #777;
            font-weight: 600;
            border-radius: 50%;
            padding-top: 3px;
            position: relative;
            z-index: 1;
            outline: none;

            &[disabled] {
                cursor: default;
            }

            .is-today & {
                border: 2px solid $color-green;
                color: $color-green;
            }

            .is-disabled &,
            .is-other-month & {
                color: #ddd;
            }

            .is-marked & {
                color: $color-green;
            }

            .is-today.is-disabled & {
                border-color: #ddd;
            }

            .is-first-marked &,
            .is-last-marked & {
                background: $color-green;
                color: #fff;
            }
        }
    }
</style>
