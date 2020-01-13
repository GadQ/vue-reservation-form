import {shallowMount} from '@vue/test-utils'
import Rating from '@/components/Rating.vue';

const isStarFull = element => element.classList.contains('is-full');
const isStarHalf = element => element.classList.contains('is-half');
const isStarEmpty = element => !isStarFull(element) && !isStarHalf(element);

const svgStarSelector = '.rating__star-svg';

describe('Rating.vue', () => {
    it('Renders 5 empty stars when rating is less than 0', () => {
        const wrapper = shallowMount(Rating, {
            propsData: {
                rating: {
                    rate: -1,
                    count: 0
                }
            }
        });

        const stars = [...wrapper.element.querySelectorAll(svgStarSelector)];
        const emptyStarsCount = stars.filter(isStarEmpty).length;

        expect(emptyStarsCount).toBe(5);
    });

    it('Renders 5 empty stars when rating is 0', () => {
        const wrapper = shallowMount(Rating, {
            propsData: {
                rating: {
                    rate: 0,
                    count: 0
                }
            }
        });

        const stars = [...wrapper.element.querySelectorAll(svgStarSelector)];
        const emptyStarsCount = stars.filter(isStarEmpty).length;

        expect(emptyStarsCount).toBe(5);
    });

    it('Renders 5 empty stars when rating is 0.3 or less', () => {
        const wrapper = shallowMount(Rating, {
            propsData: {
                rating: {
                    rate: 0.3,
                    count: 0
                }
            }
        });

        const stars = [...wrapper.element.querySelectorAll(svgStarSelector)];
        const emptyStarsCount = stars.filter(isStarEmpty).length;

        expect(emptyStarsCount).toBe(5);
    });

    it('Renders 4 full stars and 1 half star when rating is 4.6 or less', () => {
        const wrapper = shallowMount(Rating, {
            propsData: {
                rating: {
                    rate: 4.6,
                    count: 0
                }
            }
        });

        const stars = [...wrapper.element.querySelectorAll(svgStarSelector)];
        const fullStarsCount = stars.filter(isStarFull).length;
        const halfStarsCount = stars.filter(isStarHalf).length;

        expect(fullStarsCount).toBe(4);
        expect(halfStarsCount).toBe(1);
    });

    it('Renders 5 full stars when rating is 5', () => {
        const wrapper = shallowMount(Rating, {
            propsData: {
                rating: {
                    rate: 5,
                    count: 0
                }
            }
        });

        const stars = [...wrapper.element.querySelectorAll(svgStarSelector)];
        const fullStarsCount = stars.filter(isStarFull).length;

        expect(fullStarsCount).toBe(5);
    });

    it('Renders 5 full stars when rating is greater than 5', () => {
        const wrapper = shallowMount(Rating, {
            propsData: {
                rating: {
                    rate: 10,
                    count: 0
                }
            }
        });

        const stars = [...wrapper.element.querySelectorAll(svgStarSelector)];
        const fullStarsCount = stars.filter(isStarFull).length;

        expect(fullStarsCount).toBe(5);
    });
});

