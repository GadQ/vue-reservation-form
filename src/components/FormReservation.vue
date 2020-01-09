<template>
    <form action="#" class="reservation">
        <div class="reservation__header">
            <div class="reservation__price">
                <span class="sr-only">Price:</span>{{ price }} {{ currency }}
            </div>

            <div class="reservation__rating">
                <Rating :rating="rating"/>
            </div>
        </div>

        <fieldset class="reservation__dates">
            <legend class="reservation__dates-legend">Dates</legend>
            <div class="reservation__dates-buttons">
                <button class="reservation__dates-button" type="button">
                    Check In
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 22" width="28" class="reservation__dates-separator">
                    <path d="M32 11c0-.27-.11-.52-.3-.71l-9.9-10a1 1 0 00-1.4 0c-.4.4-.4 1.04 0 1.43L28.58 10H1A1 1 0 000 11a1 1 0 001 1h27.59l-8.2 8.28c-.39.4-.39 1.03 0 1.42a1 1 0 001.42 0l9.9-9.99c.18-.19.29-.45.29-.71z"/>
                </svg>
                <button class="reservation__dates-button" type="button">
                    Check Out
                </button>
            </div>
        </fieldset>
        <DatePicker/>
    </form>
</template>

<script>
    import Rating from "./Rating";
    import DatePicker from "./DatePicker";

    export default {
        name: 'FormReservation',
        data: () => ({
            checkIn: null,
            checkOut: null
        }),
        props: {
            price: Number,
            currency: String,
            rating: Object,
            dateCheckIn: String,
            dateCheckOut: String
        },
        components: {
            Rating,
            DatePicker
        },
        watch: {
            dateCheckIn: {
                handler: function (date) {
                    this.checkIn = date;
                },
                immediate: true
            },
            dateCheckOut: {
                handler: function (date) {
                    this.checkOut = date;
                },
                immediate: true
            },
        }
    }
</script>

<style lang="scss">
    $color-gray: #ccc;

    .reservation {
        border: 2px solid $color-gray;
        padding: 20px 25px 25px 25px;

        &__header {
            border-bottom: 2px solid $color-gray;
            margin-bottom: 20px;
            padding-bottom: 20px;
        }

        &__price {
            font-size: 23px;
            font-weight: 700;
            margin-bottom: 3px;
        }

        &__dates {
            position: relative;
            border: 1px solid $color-gray;
            margin: 45px 0 20px 0;
            padding: 8px;
            display: flex;
        }

        &__dates-legend {
            position: absolute;
            left: 0;
            bottom: calc( 100% + 5px);
            font-weight: 600;
            font-size: 13px;
        }

        &__dates-buttons {
            display: flex;
        }

        &__dates-button {
            flex-basis: 100%;
            text-align: left;
            border: none;
            background: none;
            cursor: pointer;
            padding: 5px 8px;
            letter-spacing: -0.7px;
            font-size: 19px;
        }

        &__dates-separator {
            flex-shrink: 0;
            margin: 0 10px;
        }
    }

</style>
