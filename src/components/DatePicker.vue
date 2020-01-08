<template>
    <div class="datepicker">
        <div class="datepicker__header">
            <button class="datepicker__month-prev">
                &lt;
            </button>
            <div class="datepicker__month-viewed">March 2017</div>
            <button class="datepicker__month-next">
                &gt;
            </button>
        </div>
        <div class="datepicker__table">
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
                <button type="button" v-for="date in daysOfMonth" :key="date.getTime()" @click="setDate(date)">
                    {{date.getDate()}}
                </button>
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
            dateShow: null,
        }),
        props: {},
        computed: {
            daysOfMonth() {
                const date = new Date();
                date.setDate(1);
                date.setDate(-1 * date.getDay());

                const days = [];
                for( let i = 0; i<42; i++) {
                    date.setDate(date.getDate() + 1);
                    days.push(new Date(date.getTime()));
                }

                return days;
            }
        },
        methods: {
            setDate(date) {
                console.log(date);
            }
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
