<template>
    <div class="dashboard-editor-container">
        <GithubCorner class="github-corner" />
        <PanelGroup @handle-set-line-chart-data="handleSetLineChartData" />
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
            <LineChart :chart-data="lineChartData" />
        </el-row>

        <el-row :gutter="32">
            <el-col :lg="8" :sm="24" :xs="24">
                <div class="chart-wrapper">
                    <RadarChart />
                </div>
            </el-col>
            <el-col :lg="8" :sm="24" :xs="24">
                <div class="chart-wrapper">
                    <PieChart />
                </div>
            </el-col>
            <el-col :lg="8" :sm="24" :xs="24">
                <div class="chart-wrapper">
                    <BarChart />
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="8">
            <el-col :lg="{span: 16}" :md="{span: 24}" :sm="{span: 24}" :xl="{span: 16}" :xs="{span: 24}"
                    style="padding-right:8px;margin-bottom:30px;">
                <DependsTable />
            </el-col>
            <el-col :lg="{span: 8}" :md="{span: 24}" :sm="{span: 24}" :xl="{span: 8}" :xs="{span: 24}" style="padding-right:8px;margin-bottom:30px;">
                <TodoList />
            </el-col>
        </el-row>

        <el-row>
            <el-col :lg="{span: 16}" :md="{span: 24}" :sm="{span: 24}" :xl="{span: 16}" :xs="{span: 24}"
                    style="padding-right:8px;margin-bottom:30px;">
                <UpdateTimeline />
            </el-col>
            <el-col :lg="{span: 8}" :md="{span: 24}" :sm="{span: 24}" :xl="{span: 8}" :xs="{span: 24}" style="padding-right:8px;margin-bottom:30px;">
                <BoxCard />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import GithubCorner from '@/components/github-corner/Index.vue';
import { ref } from 'vue';
import BarChart from './components/BarChart.vue';
import BoxCard from './components/BoxCard.vue';
import DependsTable from './components/DependsTable.vue';
import LineChart from './components/LineChart.vue';
import PanelGroup from './components/PanelGroup.vue';
import PieChart from './components/PieChart.vue';
import RadarChart from './components/RadarChart.vue';
import TodoList from './components/todo-list/Index.vue';
import UpdateTimeline from './components/UpdateTimeline.vue';

export default {
    components: {
        GithubCorner,
        PanelGroup,
        LineChart,
        RadarChart,
        PieChart,
        BarChart,
        DependsTable,
        TodoList,
        BoxCard,
        UpdateTimeline
    },
    setup() {
        const data = {
            newVisitis: {
                expectedData: [100, 120, 161, 134, 105, 160, 165],
                actualData: [120, 82, 91, 154, 162, 140, 145]
            },
            messages: {
                expectedData: [200, 192, 120, 144, 160, 130, 140],
                actualData: [180, 160, 151, 106, 145, 150, 130]
            },
            purchases: {
                expectedData: [80, 100, 121, 104, 105, 90, 100],
                actualData: [120, 90, 100, 138, 142, 130, 130]
            },
            shoppings: {
                expectedData: [130, 140, 141, 142, 145, 150, 160],
                actualData: [120, 82, 91, 154, 162, 140, 130]
            }
        };

        const lineChartData = ref(data.newVisitis);
        const handleSetLineChartData = (type) => {
            lineChartData.value = data[type];
        };

        return {
            lineChartData,
            handleSetLineChartData
        };
    }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
    position: relative;
    padding: 32px;
    background-color: rgb(240, 242, 245);

    .github-corner {
        position: absolute;
        top: 0px;
        right: 0;
        border: 0;
    }

    .chart-wrapper {
        margin-bottom: 32px;
        padding: 16px 16px 0;
        background: #fff;
    }
}

@media (max-width: 1024px) {
    .chart-wrapper {
        padding: 8px;
    }
}
</style>
