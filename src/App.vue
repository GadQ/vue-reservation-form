<template>
    <div id="app">
        <div class="reservation-form">
            <FormReservation :price="price" :currency="currency" :rating="rating" :dates="dates" />
        </div>
    </div>
</template>

<script>
    import FormReservation from "./components/FormReservation";

    export default {
        name: 'app',
        data: () => ({
            price: 300,
            currency: 'zł',
            rating: {
                rate: 4.5,
                count: 123
            },
            dates: {
                checkIn: new Date('2020/01/22'),
                checkOut: new Date('2020/01/24'),
                availableFrom: new Date('2019/12/12'),
                availableTo: new Date('2020/03/20'),
                unavailableDates: [
                    {
                        from: new Date('2020/01/28'),
                        to: new Date('2020/01/28'),
                    },
                    {
                        from: new Date('2020/02/11'),
                        to: new Date('2020/02/13'),
                    }
                ]
            }
        }),
        components: {
            FormReservation
        }
    }
</script>

<style lang="scss">
    .reservation-form {
        width: 460px;
        padding: 15px;
    }
</style>
