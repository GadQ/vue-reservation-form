<template>
    <div class="datepicker">
        <div class="datepicker__header">
            <button type="button" class="datepicker__month-button" @click="prevMonth"
                    :disabled="!isPreviousMonthAvailable">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 35" width="20"
                     class="datepicker__month-button-icon">
                    <path
                        d="M6.7 17.5L19.75 3.89a.89.89 0 00-.02-1.24L17.41.26a.85.85 0 00-1.22-.01L.24 16.87a.82.82 0 00-.24.63c0 .24.07.47.24.64l15.95 16.61c.33.34.88.33 1.22-.01l2.33-2.4c.34-.34.35-.9.02-1.23L6.69 17.5z"/>
                </svg>
            </button>
            <transition name="slide-fade" mode="out-in">
                <div class="datepicker__month-viewed" :key="currentMonthText">{{ currentMonthText }}</div>
            </transition>
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
                     v-for="(day, dayIndex) in daysOfMonth" :key="dayIndex">
                    <transition name="fade" mode="out-in">
                        <button type="button" class="datepicker__day-button" @click="setDate(day)"
                                :disabled="!isDateAvailable(day)" :key="day.getTime()">
                            {{day.getDate()}}
                        </button>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as dateUtils from '../utils/date';

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
                const date = dateUtils.getFirstDayOfMonth(this.dateShow);
                const weeks = dateUtils.getFullWeeksInMonth(date);
                const daysFromSunday = date.getDay();
                date.setDate(-1 * daysFromSunday + 1);

                const days = [];
                for (let i = 0; i < weeks * dateUtils.DAYS_IN_WEEK; i++) {
                    days.push(new Date(date));
                    date.setDate(date.getDate() + 1);
                }

                return days;
            },
            currentMonthText() {
                return this.dateShow.toLocaleString('en-GB', {
                    month: 'long',
                    year: 'numeric'
                });
            },
            availableToDate() {
                if (this.dateFrom === null || this.dateTo !== null) {
                    return this.availableTo;
                }

                const unavailableFrom = this.unavailableDates.reduce((arr, date) => {
                    if (this.dateFrom < date.from) {
                        arr.push(date.from);
                    }
                    return arr;
                }, []);

                if (unavailableFrom.length === 0) {
                    return this.availableTo;
                }

                const closestUnavailable = unavailableFrom.reduce((dateMin, date) => {
                    return date < dateMin ? date : dateMin;
                });

                if (this.availableTo == null) {
                    return closestUnavailable;
                } else {
                    return this.availableTo < closestUnavailable ? this.availableTo : closestUnavailable;
                }
            },
            availableFromDate() {
                if (this.dateFrom === null || this.dateTo !== null) {
                    return this.availableFrom;
                }

                const unavailableTo = this.unavailableDates.reduce((arr, date) => {
                    if (this.dateFrom > date.to) {
                        arr.push(date.to);
                    }
                    return arr;
                }, []);

                if (unavailableTo.length === 0) {
                    return this.availableFrom;
                }

                const closestUnavailable = unavailableTo.reduce((maxDate, date) => {
                    return date > maxDate ? date : maxDate;
                });

                if (this.availableFrom == null) {
                    return closestUnavailable;
                } else {
                    return this.availableFrom > closestUnavailable ? this.availableFrom : closestUnavailable;
                }
            },
            isPreviousMonthAvailable() {
                const from = this.availableFrom || new Date();
                return dateUtils.getFirstDayOfMonth(this.dateShow) > dateUtils.getFirstDayOfMonth(from);
            }
        },
        methods: {
            setDate(date) {
                if (this.dateFrom === null || this.dateTo !== null) {
                    this.dateFrom = date;
                    this.dateTo = null;
                } else {
                    if (date < this.dateFrom) {
                        this.dateTo = this.dateFrom;
                        this.dateFrom = date
                    } else {
                        this.dateTo = date;
                    }
                }
            },
            nextMonth() {
                const dateNew = new Date(this.dateShow);
                dateNew.setMonth(dateNew.getMonth() + 1);
                this.dateShow = dateNew;
            },
            prevMonth() {
                const dateNew = new Date(this.dateShow);
                dateNew.setMonth(dateNew.getMonth() - 1);
                this.dateShow = dateNew;
            },
            isDayFromOtherMonth(date) {
                return date.getMonth() !== this.dateShow.getMonth();
            },
            isDateAvailable(date) {
                if (dateUtils.isFromPast(date)) {
                    return false;
                }

                if (this.isInUnavailableDates(date)) {
                    return false;
                }

                return dateUtils.isInRange(date, this.availableFromDate, this.availableToDate);
            },
            isInUnavailableDates(date) {
                if (this.unavailableDates.length === 0) {
                    return false;
                }

                return this.unavailableDates.some(dateRange => {
                    return dateUtils.isInRange(date, dateRange.from, dateRange.to);
                });
            },
            isToday(date) {
                return dateUtils.isToday(date);
            },
            isMarked(day) {
                if (this.dateTo === null) {
                    return false;
                }
                return dateUtils.isInRange(day, this.dateFrom, this.dateTo);
            },
            isFirstMarked(day) {
                return this.dateFrom !== null && day.getTime() === this.dateFrom.getTime();
            },
            isLastMarked(day) {
                return this.dateTo !== null && day.getTime() === this.dateTo.getTime();
            },
            initVisibleMonth() {
                const {dateFrom, availableFrom} = this;

                if (dateFrom !== null) {
                    this.dateShow = dateFrom > availableFrom ? dateFrom : availableFrom;
                } else {
                    const today = dateUtils.getToday();
                    this.dateShow = today > availableFrom ? today : availableFrom;
                }
            },
            initDates() {
                this.dateFrom = this.dateStart || null;
                this.dateTo = this.dateEnd || null;

                if (this.dateFrom === null && this.dateTo !== null) {
                    this.dateFrom = new Date(this.dateTo);
                    this.dateTo = null;
                } else {
                    if (this.dateTo !== null && this.dateFrom > this.dateTo) {
                        const dateTo = new Date(this.dateTo);
                        this.dateTo = new Date(this.dateFrom);
                        this.dateFrom = dateTo;
                    }
                }
            }
        },
        watch: {
            dateFrom(date) {
                this.$emit('dateFromChanged', date);
            },
            dateTo(date) {
                this.$emit('dateToChanged', date);
            },
            dateStart: {
                handler: function () {
                    this.initDates();
                    this.initVisibleMonth();
                },
                immediate: true
            },
            dateEnd: {
                handler: function () {
                    this.initDates();
                    this.initVisibleMonth();
                },
                immediate: true
            }
        }
    }
</script>

<style lang="scss">
    $color-green: #00dbb1;
    $color-green-light: #c3fef8;

    @mixin disabled-cursor-placeholder {
        cursor: default;

        @supports (cursor: not-allowed) {
            cursor: not-allowed;
        }
    }

    .slide-fade-enter-active {
        transition: transform 200ms ease-out, opacity 200ms ease-out;
    }

    .slide-fade-leave-active {
        transition: transform 100ms ease-out, opacity 100ms ease-out;
    }

    .slide-fade-enter,
    .slide-fade-leave-to {
        opacity: 0;
        transform: scale(0.8);
    }

    .fade-enter-active {
        transition: opacity 200ms linear;
    }

    .fade-leave-active {
        transition: opacity 100ms linear;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }

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
            transition: opacity 250ms ease-out, transform 250ms ease-out;
            opacity: 1;

            &:hover,
            &:focus {
                outline: none;
                transform: scale(1.2);
            }

            &[disabled] {
                @include disabled-cursor-placeholder;
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
            border: 1px solid #ddd;
            border-top: none;
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

                &.is-first-marked {
                    background: linear-gradient(90deg, transparent 0%, transparent 50%, $color-green-light 50%, $color-green-light 100%);
                }

                &.is-last-marked {
                    background: linear-gradient(90deg, $color-green-light 0%, $color-green-light 50%, transparent 50%, transparent 100%);
                }

                &.is-first-marked.is-last-marked {
                    background: none;
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

            &:focus {
                outline: none;
            }

            &:not([disabled]):hover,
            &:not([disabled]):focus {
                &:after {
                    opacity: 0.5;
                    transform: translate(-50%, -50%) scale(1);
                }
            }

            &:after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.5);
                z-index: 1;
                width: 30px;
                height: 30px;
                background: transparent;
                border: 2px solid;
                border-radius: 50%;
                opacity: 0;
                transition: transform 250ms ease-out, opacity 250ms ease-out;
            }

            &[disabled] {
                @include disabled-cursor-placeholder;
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
