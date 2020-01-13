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
                <button class="reservation__dates-button" :class="{ 'is-active': isCheckInActive}" type="button" @click.stop="toggleDatepicker" ref="checkInButton">
                    {{ checkInLabel }}
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 22" width="28"
                     class="reservation__dates-separator">
                    <path
                        d="M32 11c0-.27-.11-.52-.3-.71l-9.9-10a1 1 0 00-1.4 0c-.4.4-.4 1.04 0 1.43L28.58 10H1A1 1 0 000 11a1 1 0 001 1h27.59l-8.2 8.28c-.39.4-.39 1.03 0 1.42a1 1 0 001.42 0l9.9-9.99c.18-.19.29-.45.29-.71z"/>
                </svg>
                <button class="reservation__dates-button" :class="{ 'is-active': isCheckOutActive}" type="button" @click.stop="toggleDatepicker">
                    {{ checkOutLabel }}
                </button>
            </div>

            <transition name="slide-down">
                <div class="reservation__datepicker" :class="{ 'is-checkout-active': isCheckOutActive}" v-show="datepickerOpen" @click.stop>
                    <DatePicker
                        :date-start="checkIn"
                        :date-end="checkOut"
                        :available-from="dates.availableFrom"
                        :available-to="dates.availableTo"
                        :unavailableDates="dates.unavailableDates"
                        @dateFromChanged="checkInChanged"
                        @dateToChanged="checkOutChanged"
                    />
                </div>
            </transition>
        </fieldset>
    </form>
</template>

<script>
    import Rating from "./Rating";
    import DatePicker from "./DatePicker";

    export default {
        name: 'FormReservation',
        data: () => ({
            checkIn: null,
            checkOut: null,
            datepickerOpen: false
        }),
        props: {
            price: Number,
            currency: String,
            rating: Object,
            dates: Object
        },
        components: {
            Rating,
            DatePicker
        },
        computed: {
            isCheckInActive() {
                return this.datepickerOpen && this.checkIn && this.checkOut;
            },
            isCheckOutActive() {
                return this.datepickerOpen && !this.checkOut;
            },
            checkInLabel() {
                if (!this.checkIn) {
                    return 'CheckIn';
                }

                return this.checkIn.toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
            },
            checkOutLabel() {
                if (!this.checkOut) {
                    return 'Check Out';
                }

                return this.checkOut.toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
            }
        },
        methods: {
            checkInChanged(date) {
                this.checkIn = date;
            },
            checkOutChanged(date) {
                this.checkOut = date;
            },
            toggleDatepicker() {
                this.datepickerOpen = !this.datepickerOpen;
                if( !this.datepickerOpen ) {
                    this.$refs.checkInButton.focus();
                }
            },
            closeDatepicker() {
                this.datepickerOpen = false;
                this.$refs.checkInButton.focus();
            },
            handleKeyboardEvents(event) {
                if( event.key === 'Escape' ) {
                    this.closeDatepicker();
                }
            }
        },
        watch: {
            dates: {
                handler: function (dates) {
                    this.checkOut = dates.checkOut;
                    this.checkIn = dates.checkIn;
                },
                immediate: true
            },
        },
        mounted() {
            document.addEventListener('click', this.closeDatepicker);
            document.addEventListener('keyup', this.handleKeyboardEvents);
        },
        destroyed() {
            document.removeEventListener('click', this.closeDatepicker);
            document.removeEventListener('keyup', this.handleKeyboardEvents);
        }
    }
</script>

<style lang="scss">
    $color-gray: #ccc;

    .reservation {
        border: 1px solid $color-gray;
        padding: 20px 25px 25px 25px;

        &__header {
            border-bottom: 1px solid $color-gray;
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
            bottom: calc(100% + 5px);
            font-weight: 600;
            font-size: 13px;
        }

        &__dates-buttons {
            display: flex;
            width: 100%;
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
            border-radius: 4px;
            transition: background 250ms ease-out;

            &:hover,
            &:focus {
                background: #ddd;
            }

            &:focus {
                outline: none;
            }

            &.is-active {
                background: #9ddad4;
            }
        }

        &__dates-separator {
            flex-shrink: 0;
            margin: 0 10px;
        }

        &__datepicker {
            position: absolute;
            top: calc(100% + 6px);
            left: 0;
            z-index: 1;

            &.is-checkout-active {
                &:before {
                    left: 75%;
                }
            }

            &:before {
                content: '';
                width: 15px;
                height: 15px;
                background: #00dbb1;
                position: absolute;
                left: calc( 25% - 16px );
                top: 1px;
                transform-origin: 0 0;
                transform: rotate(-45deg);
                z-index: -1;
                transition: left 250ms ease-out;
            }
        }

        .slide-down-enter,
        .slide-down-leave-to {
            opacity: 0;
            transform: translateY(-20px);
        }

        .slide-down-enter-active,
        .slide-down-leave-active {
            transition: opacity 250ms ease-out, transform 250ms ease-out;
        }
    }

</style>
