<template>
    <div id="homebarcharts" :class="className" :style="{height: height, width: width}" />
</template>

<script lang="ts">
import { defineComponent, nextTick, onActivated, onBeforeUnmount, onDeactivated, onMounted } from 'vue';
import resize from '@/components/charts/mixins/resize';
import { EChartsOption, init } from 'echarts';

export default defineComponent({
    props: {
        className: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '100%',
            required: true
        },
        height: {
            type: String,
            default: '300px',
            required: true
        }
    },
    setup() {
        const {
            mounted,
            chart,
            beforeDestroy,
            activated,
            deactivated
        } = resize();

        const animationDuration = 6000;
        const initChart = () => {
            const barChart = init(document.getElementById('homebarcharts') as HTMLDivElement, 'macarons');
            barChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: 10,
                    left: '2%',
                    right: '2%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    type: 'value',
                    axisTick: {
                        show: false
                    }
                }],
                series: [{
                    name: 'pageA',
                    type: 'bar',
                    stack: 'vistors',
                    // barWidth: '60%',
                    data: [79, 52, 200, 334, 390, 330, 220],
                    animationDuration
                }, {
                    name: 'pageB',
                    type: 'bar',
                    stack: 'vistors',
                    // barWidth: '60%',
                    data: [80, 52, 200, 334, 390, 330, 220],
                    animationDuration
                }, {
                    name: 'pageC',
                    type: 'bar',
                    stack: 'vistors',
                    // barWidth: '60%',
                    data: [30, 52, 200, 334, 390, 330, 220],
                    animationDuration
                }]
            } as EChartsOption);
            chart.value = barChart;
        };

        onMounted(() => {
            mounted();
            nextTick(() => {
                initChart();
            });
        });

        onBeforeUnmount(() => {
            // if (!chart.value) {
            //   return
            // }
            // chart.value.dispose()
            // chart.value = null
            beforeDestroy();
        });

        onActivated(() => {
            activated();
        });

        onDeactivated(() => {
            deactivated();
        });

        return {};
    }
});
</script>
