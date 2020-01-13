import {shallowMount} from '@vue/test-utils'
import DatePicker from '@/components/DatePicker.vue';

describe('DatePicker.vue', () => {
    it('Has dateFrom set to Date and dateTo set to null if dateStart is null and dateEnd is Date', () => {
        const wrapper = shallowMount(DatePicker, {
            propsData: {
                dateStart: null,
                dateEnd: new Date()
            },
        });

        expect(wrapper.vm.$data.dateTo).toBe(null);
        expect(wrapper.vm.$data.dateFrom).toEqual(expect.any(Date));
    });

    it('Has dateFrom earlier than dateTo if dateEnd is earlier than dateStart', () => {
        const wrapper = shallowMount(DatePicker, {
            propsData: {
                dateStart: new Date('2020/01/01'),
                dateEnd: new Date('2019/01/01')
            }
        });

        expect(wrapper.vm.$data.dateFrom < wrapper.vm.$data.dateTo).toBe(true);
    });

    it('Has dateShow set to today if no props have been set', () => {
        const wrapper = shallowMount(DatePicker);
        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

        expect(wrapper.vm.$data.dateShow.getTime()).toBe(today.getTime());
    });

    it('Has dateShow set to availableFrom if availableFrom is set to date in the future', () => {
        const today = new Date();
        const nextMonth = new Date( today );
        nextMonth.setMonth( nextMonth.getMonth() + 1);
        const wrapper = shallowMount(DatePicker,{
            propsData: {
                availableFrom: nextMonth
            }
        });

        expect(wrapper.vm.$data.dateShow.getTime()).toBe(nextMonth.getTime());
    });
});

