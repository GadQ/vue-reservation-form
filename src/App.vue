<template>
    <div id="app">
        <div class="reservation-form">
            <FormReservation :price="price" :currency="currency" :rating="rating" date-check-in="01.02.2020" date-check-out="01.03.2020" />
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

    body,
    html {
        background: #ececec;
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
