module.exports = {
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/scss/pre.scss";`
            },
        }
    }
}