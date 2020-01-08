<template>
    <div id="app">
        <div class="reservation-form"></div>
    </div>
</template>

<script>
    export default {
        name: 'app',
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

    .reservation-form {
        width: 460px;
        padding: 15px;
    }

</style>
