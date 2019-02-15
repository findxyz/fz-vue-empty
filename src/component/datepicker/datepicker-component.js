const DATEPICKER_I18N = {
    previousMonth: '上个月',
    nextMonth: '下个月',
    months: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    weekdaysShort: ['日', '一', '二', '三', '四', '五', '六']
};

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

Vue.component('datepicker', {
    inheritAttrs: false,
    props: {
        'value': String,
        'init': Boolean
    },
    template: `
        <div style="position: relative; display: inline-flex;">
            <input type="text" v-bind="$attrs" :value="value" readonly ref="date" placeholder="选择日期" style="padding: 0.5em">
            <a href="javascript: void(0)" @click="clear" style="position: absolute; top: 10%; right: 5%; text-decoration: none; color: gray;">x</a>
        </div>
    `,
    mounted: function () {
        this.attachDatepicker('date');
    },
    methods: {
        attachDatepicker: function (refName) {
            let me = this;
            let dateDom = me.$refs[refName];
            if (me.init) {
                me.$emit('input', moment().format(DEFAULT_DATE_FORMAT));
            }
            let picker = new Pikaday({
                i18n: DATEPICKER_I18N,
                field: dateDom,
                format: DEFAULT_DATE_FORMAT,
                showMonthAfterYear: true,
                showDaysInNextAndPreviousMonths: true,
                onSelect: function (date) {
                    me.$emit('input', picker.toString());
                }
            });

            me.$once('hook:beforeDestroy', function () {
                picker.destroy();
            });
        },
        clear: function () {
            this.$emit('input', '');
        }
    }
});
