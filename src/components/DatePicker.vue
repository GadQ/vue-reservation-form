<template>
    <div class="datepicker">
        <div class="datepicker__header">
            <button type="button" class="datepicker__month-button" @click="prevMonth">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 35" width="20" class="datepicker__month-button-icon">
                    <path d="M6.7 17.5L19.75 3.89a.89.89 0 00-.02-1.24L17.41.26a.85.85 0 00-1.22-.01L.24 16.87a.82.82 0 00-.24.63c0 .24.07.47.24.64l15.95 16.61c.33.34.88.33 1.22-.01l2.33-2.4c.34-.34.35-.9.02-1.23L6.69 17.5z"/>
                </svg>
            </button>
            <div class="datepicker__month-viewed">{{ currentMonth }}</div>
            <button type="button" class="datepicker__month-button" @click="nextMonth">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 35" width="20" class="datepicker__month-button-icon">
                    <path d="M13.3 17.5L.25 3.89a.89.89 0 01.02-1.24L2.59.26A.85.85 0 013.81.25l15.95 16.62c.18.17.25.4.24.63 0 .24-.07.47-.24.64L3.81 34.75a.85.85 0 01-1.22-.01l-2.33-2.4a.89.89 0 01-.02-1.23L13.31 17.5z"/>
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
                <div class="datepicker__day" v-for="date in daysOfMonth" :key="date.getTime()">
                    <button type="button" class="datepicker__day-button" @click="setDate(date)">
                        {{date.getDate()}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DatePickeer',
        data: () => ({
            dateFrom: null,
            dateTo: null,
            dateShow: new Date(),
        }),
        props: {},
        computed: {
            daysOfMonth() {
                const date = new Date(this.dateShow.getTime());
                date.setDate(1);
                const weeks = this.calculateWeeks(date);
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
            }
        },
        methods: {
            setDate(date) {
                console.log(date);
            },
            calculateWeeks(date) {
                const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
                return Math.ceil((daysInMonth + date.getDay()) / 7);
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
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $color-green: #00dbb1;

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
        }

        &__day-button {
            cursor: pointer;
            width: 42px;
            height: 42px;
            font-size: 13px;
            border: none;
            background: none;
        }
    }
</style>
