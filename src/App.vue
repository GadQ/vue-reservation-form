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
                checkIn: new Date('2020.01.15'),
                checkOut: new Date('2020.01.17'),
                availableFrom: new Date('2020.01.01'),
                availableTo: new Date('2020.03.13'),
                unavailableDates: [
                    {
                        from: new Date('2020.01.13'),
                        to: new Date('2020.01.14'),
                    },
                    {
                        from: new Date('2020.01.30'),
                        to: new Date('2020.01.30'),
                    },
                    {
                        from: new Date('2020.02.03'),
                        to: new Date('2020.02.06'),
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
    * {
        box-sizing: border-box;

        &::before,
        &::after {
            box-sizing: border-box;
        }
    }

    @mixin fontface($font-name, $font-file, $font-weight: 400, $font-style: normal) {
        $font-base-dir: 'assets/fonts/' !default;

        @font-face {
            font-family: $font-name;
            src: url('#{$font-base-dir}#{$font-file}.woff2') format('woff2'),
            url('#{$font-base-dir}#{$font-file}.woff') format('woff');
            font-weight: $font-weight;
            font-style: $font-style;
        }
    }

    @include fontface('Montserrat', 'montserrat-regular');
    @include fontface('Montserrat', 'montserrat-medium', 500);
    @include fontface('Montserrat', 'montserrat-semibold', 600);
    @include fontface('Montserrat', 'montserrat-bold', 700);

    body,
    html {
        background: #ececec;
    }

    body,
    button,
    input,
    select,
    textarea {
        font-family: 'Montserrat', sans-serif;
        font-weight: 500;
        font-size: 14px;
        color: #444;
    }

    body {
        line-height: 1.45;
    }

    svg {
        pointer-events: none;
        display: block;
    }

    .sr-only {
        border: 0 !important;
        clip: rect(1px, 1px, 1px, 1px) !important;
        -webkit-clip-path: inset(50%) !important;
        clip-path: inset(50%) !important;
        height: 1px !important;
        margin: -1px !important;
        overflow: hidden !important;
        padding: 0 !important;
        position: absolute !important;
        width: 1px !important;
        white-space: nowrap !important;
    }

    .reservation-form {
        width: 460px;
        padding: 15px;
    }

</style>
