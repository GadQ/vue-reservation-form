<template functional>
    <div class="rating">
        <div class="sr-only">
            Rating: {{ props.rating.rate }} / {{ props.rating.count }}
        </div>
        <div class="rating__stars" aria-hidden="true">
            <span v-for="rateIndex in 5" :key="rateIndex" class="rating__star">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 10.3125" width="11" class="rating__star-svg"
                     :class="$options.chooseStar(rateIndex , props.rating.rate)">
                    <path
                        d="m 11,3.94309 -4.208482,0 L 5.5,0 4.208482,3.94309 0,3.94309 3.442411,6.36941 2.101786,10.3125 5.5,7.86883 8.898214,10.3125 7.555134,6.36941 11,3.94309 Z"/>
                    <path d="M 5.5,0 4.208482,3.94309 0,3.94309 3.442411,6.36941 2.101786,10.3125 5.5,7.86883 Z"
                          class="rating__star-svg-half"/>
                </svg>
            </span>
        </div>
        <div class="rating__votes-count" aria-hidden="true">{{ props.rating.count }}</div>
    </div>
</template>

<script>
    export default {
        name: 'Rating',
        props: {
            rating: Object
        },
        chooseStar(rateIndex, rate) {
            const minHalfTreshold = 0.3;
            const maxHalfTreshold = 0.6;
            const diff = Number((rate - (rateIndex - 1)).toFixed(2));

            if (diff > minHalfTreshold && diff <= maxHalfTreshold) {
                return 'is-half';
            }

            if (diff > maxHalfTreshold) {
                return 'is-full';
            }
        },
    }
</script>

<style lang="scss">
    $color-full: #38787a;
    $color-empty: #cbc7c9;

    .rating {
        display: flex;
        align-items: flex-start;
        line-height: 1;

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

        &__votes-count {
            margin-left: 5px;
            font-weight: 600;
            font-size: 13px;
        }
    }
</style>
