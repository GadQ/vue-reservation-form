<template>
    <form action="#" class="reservation" method="post" @submit.prevent="sendForm">
        <div class="reservation__header">
            <div class="reservation__price">
                <span class="sr-only">Price:</span>{{ price }} {{ currency }}
            </div>

            <div class="reservation__rating">
                <Rating :rating="rating"/>
            </div>
        </div>

        <div class="reservation__field">
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

            <transition name="fade">
                <div class="reservation__field-error" v-if="errors.dates">{{ errors.dates }}</div>
            </transition>
        </div>


        <div class="reservation__field">
            <label class="reservation__field-label">Full name</label>
            <input class="reservation__field-input" type="text" v-model="fullName">

            <transition name="fade">
                <div class="reservation__field-error" v-if="errors.fullName">{{ errors.fullName }}</div>
            </transition>
        </div>

        <div class="reservation__footer">
            <button type="submit" class="reservation__submit">
                <span class="reservation__submit-text">Send reservation</span>
            </button>
        </div>
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
            datepickerOpen: false,
            fullName: '',
            errors: {}
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
                return this.datepickerOpen && this.checkIn && !this.checkOut;
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
                if (this.datepickerOpen) {
                    this.$refs.checkInButton.focus();
                }
                this.datepickerOpen = !this.datepickerOpen;
            },
            closeDatepicker() {
                if( this.datepickerOpen ) {
                    this.$refs.checkInButton.focus();
                }
                this.datepickerOpen = false;
            },
            handleKeyboardEvents(event) {
                if( event.key === 'Escape' ) {
                    this.closeDatepicker();
                }
            },
            validateName() {
                if( this.fullName.trim() === '' ) {
                    this.errors.fullName = 'Name cannot be empty';
                }
            },
            validateDates() {
                const isCheckInDate = this.checkIn instanceof Date;
                const isCheckOutDate = this.checkOut instanceof Date;

                if( !isCheckInDate && !isCheckOutDate ) {
                    this.errors.dates = 'You have to choose dates for reservation';
                    return;
                }

                if( !isCheckInDate ) {
                    this.errors.dates = 'You have to choose check in date for reservation';
                    return;
                }

                if( !isCheckOutDate ) {
                    this.errors.dates = 'You have to choose check out date for reservation';
                    return;
                }

                if( this.checkIn.getTime() > this.checkOut.getTime() ) {
                    this.errors.dates = 'Check out date should be later than check in date';
                    return;
                }
            },
            isFormValid() {
                this.validateName();
                this.validateDates();

                return Object.keys(this.errors).length === 0;
            },
            sendForm() {
                this.clearErrors();

                if( this.isFormValid() ) {
                    // Send data to API/Store
                    console.log('Data has been sent');
                    this.resetForm();
                }
            },
            clearErrors() {
                this.errors = {};
            },
            resetForm() {
                this.checkIn = null;
                this.checkOut = null;
                this.fullName = '';
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
    $reservation-color-border: #ccc !default;
    $reservation-color-header-border: #ccc !default;
    $reservation-color-dates-border: #ccc !default;
    $reservation-color-date-button-hover-background: #ddd !default;
    $reservation-color-date-button-active-background: #9ddad4 !default;
    $reservation-color-datepicker-arrow-background: #00dbb1 !default;
    $reservation-color-input-border: #ccc !default;
    $reservation-color-input-focus-border: #00dbb1 !default;
    $reservation-color-input-focus-shadow: #00dbb1 !default;
    $reservation-color-error-text: #e00 !default;
    $reservation-color-submit-text: #fff !default;
    $reservation-color-submit-background: #da5f5e !default;
    $reservation-color-submit-hover-background: #d94141 !default;

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

    .slide-down-enter,
    .slide-down-leave-to {
        opacity: 0;
        transform: translateY(-20px);
    }

    .slide-down-enter-active,
    .slide-down-leave-active {
        transition: opacity 250ms ease-out, transform 250ms ease-out;
    }

    .reservation {
        border: 1px solid $reservation-color-border;
        padding: 20px 25px 25px 25px;

        &__header {
            border-bottom: 1px solid $reservation-color-header-border;
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
            z-index: 3;
            border: 1px solid $reservation-color-dates-border;
            margin: 45px 0 0 0;
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
                background: $reservation-color-date-button-hover-background;
            }

            &:focus {
                outline: none;
            }

            &.is-active {
                background: $reservation-color-date-button-active-background;
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

            &.is-checkout-active {
                &:before {
                    left: 75%;
                }
            }

            &:before {
                content: '';
                width: 15px;
                height: 15px;
                background: $reservation-color-datepicker-arrow-background;
                position: absolute;
                left: calc( 25% - 16px );
                top: 1px;
                transform-origin: 0 0;
                transform: rotate(-45deg);
                z-index: -1;
                transition: left 250ms ease-out;
            }
        }

        &__field {
            margin-bottom: 15px;
        }

        &__field-label {
            font-weight: 600;
            font-size: 13px;
            display: inline-block;
            margin-bottom: 3px;
        }

        &__field-input {
            display: block;
            width: 100%;
            height: 40px;
            border: 1px solid $reservation-color-input-border;
            border-radius: 4px;
            padding: 5px 10px;
            transition: box-shadow 250ms ease-out;

            &:focus {
                outline: none;
                box-shadow: 0 0 3px $reservation-color-input-focus-shadow;
                border-color: $reservation-color-input-focus-border;
            }
        }
        
        &__field-error {
            font-size: 0.8em;
            color: $reservation-color-error-text;
            margin-top: 2px;
        }

        &__footer {
            margin-top: 15px;
            display: flex;
            justify-content: flex-end;
        }
        
        &__submit {
            padding: 14px 20px 13px 20px;
            border: none;
            background: $reservation-color-submit-background;
            font-weight: 600;
            border-radius: 4px;
            color: $reservation-color-submit-text;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            
            &:hover,
            &:focus {
                outline: none;

                &:after {
                    transform: scaleX(1);
                }
            }

            &:after {
                content: '';
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 1;
                background: $reservation-color-submit-hover-background;
                transform: scaleX(0);
                transform-origin: 0 0;
                transition: transform 250ms ease-out;
            }
        }

        &__submit-text {
            position: relative;
            z-index: 2;
        }
    }

</style>
