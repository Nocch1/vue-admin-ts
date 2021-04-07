<template>
    <div class="app-container">
        <el-input v-model="filename" placeholder="Please enter the file name (default excel-list)" prefix-icon="el-icon-document"
                  style="width:350px;" />
        <el-button :loading="downloadLoading" icon="el-icon-document" style="margin-bottom:20px" type="primary" @click="handleDownload">
            {{ t('excel.selectedExport') }}
        </el-button>
        <a href="https://github.com/rcyj-FED/vue3-composition-admin/tree/dev/src/views" style="margin-left:15px;" target="_blank">
            <el-tag type="info">Documentation</el-tag>
        </a>
        <el-table ref="multipleTableNode" v-loading="listLoading" :data="list" border element-loading-text="Loading..." fit highlight-current-row
                  @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection" />
            <el-table-column align="center" label="Id" width="95">
                <template #default="{$index}">
                    {{ $index }}
                </template>
            </el-table-column>
            <el-table-column label="Title">
                <template #default="{row}">
                    {{ row.title }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="Author" width="180">
                <template #default="{row}">
                    <el-tag>{{ row.author }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="Readings" width="115">
                <template #default="{row}">
                    {{ row.pageviews }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="PDate" width="220">
                <template #default="{row}">
                    <i class="el-icon-time" />
                    <span>{{ row.timestamp }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">

import { defineComponent, onMounted, reactive, ref, toRefs, unref } from 'vue';
import { getArticles } from '@/apis/articles';
import { ArticleModel } from '@/model/articleModel';
import { formatJson } from '@/utils';
import { exportJson2Excel } from '@/utils/excel';
import { ElMessage, ElTable } from 'element-plus';
import { useI18n } from 'vue-i18n';

export default defineComponent({
    setup() {
        const { t } = useI18n();
        const dataMap = reactive({
            list: Array<ArticleModel>(),
            listLoading: true,
            downloadLoading: false,
            multipleSelection: [],
            filename: ''
        });
        const multipleTableNode = ref(ElTable);
        const fetchData = async () => {
            dataMap.listLoading = true;
            const data = await getArticles({ /* Your params here */ });
            dataMap.list = data?.data.items ?? [];
            // Just to simulate the time of the request
            setTimeout(() => {
                dataMap.listLoading = false;
            }, 0.5 * 1000);
        };

        const handleSelectionChange = (value: any) => {
            dataMap.multipleSelection = value;
        };

        const handleDownload = () => {
            const from = unref(multipleTableNode);
            if (dataMap.multipleSelection.length) {
                dataMap.downloadLoading = true;
                const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date'];
                const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp'];
                const list = dataMap.multipleSelection;
                const data = formatJson(filterVal, list);
                exportJson2Excel(tHeader, data, dataMap.filename !== '' ? dataMap.filename : undefined);
                from.clearSelection();
                dataMap.downloadLoading = false;
            } else {
                ElMessage.warning('Please select at least one item');
            }
        };

        onMounted(() => {
            fetchData();
        });
        return { t, ...toRefs(dataMap), fetchData, handleDownload, handleSelectionChange };
    }
});
</script>
