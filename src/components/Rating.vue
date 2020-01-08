<template>
    <div class="rating">
        <div class="sr-only">
            Rating: {{ rating.rate }} / {{ rating.count }}
        </div>
        <div class="rating__stars" aria-hidden="true">
            <span v-for="rateIndex in 5" :key="rateIndex" class="rating__star">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 10.3125" width="11" class="rating__star-svg"
                     :class="chooseStar(rateIndex)">
                    <path
                        d="m 11,3.94309 -4.208482,0 L 5.5,0 4.208482,3.94309 0,3.94309 3.442411,6.36941 2.101786,10.3125 5.5,7.86883 8.898214,10.3125 7.555134,6.36941 11,3.94309 Z"/>
                    <path d="M 5.5,0 4.208482,3.94309 0,3.94309 3.442411,6.36941 2.101786,10.3125 5.5,7.86883 Z"
                          class="rating__star-svg-half"/>
                </svg>
            </span>
        </div>
        <div class="rating__votes-count" aria-hidden="true">{{ rating.count }}</div>
    </div>
</template>

<script>
    export default {
        name: 'Rating',
        props: {
            rating: Object
        },
        methods: {
            chooseStar(rateIndex) {
                const diff = Number((this.rating.rate - (rateIndex - 1)).toFixed(2));

                if (diff > 0.3 && diff <= 0.6) {
                    return 'is-half';
                }
                if (diff > 0.6) {
                    return 'is-full';
                }
            },
        }
    }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    $color-full: #38787a;
    $color-empty: #cbc7c9;

    .rating {
        display: flex;

        &__stars {
            display: flex;
        }

        &__star-svg {
            fill: $color-empty;

            &.is-full {
                fill: $color-full;
            }

            &.is-half {
                fill: $color-empty;

                .rating__star-svg-half {
                    fill: $color-full;
                }
            }
        }
    }

</style>
