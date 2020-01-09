<template>
    <div class="datepicker">
        <div class="datepicker__header">
            <button class="datepicker__month-prev" @click="prevMonth">
                &lt;
            </button>
            <div class="datepicker__month-viewed">{{ currentMonth }}</div>
            <button class="datepicker__month-next" @click="nextMonth">
                &gt;
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

        &__month-prev {
        }

        &__month-viewed {
            flex-grow: 1;
            text-align: center;
        }

        &__month-next {
        }

        &__body {
            background: #fff;
            padding: 20px;
        }

        &__weekdays {
            display: grid;
            grid-template-columns: repeat(7, 1fr);

        }

        &__weekday {
            text-align: center;
        }

        &__days {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
        }

        &__day {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px 0;
        }

        &__day-button {
            cursor: pointer;
            width: 42px;
            height: 42px;
        }
    }
</style>
