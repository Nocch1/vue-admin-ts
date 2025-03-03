<template>
    <div class="app-container">
        <div>
            <FilenameOption v-model="filename" />
            <AutoWidthOption v-model="autoWidth" />
            <BookTypeOption :value="bookType" @changeinput="changeinput" />
            <el-button :loading="downloadLoading" icon="el-icon-document" style="margin:0 0 20px 20px;" type="primary" @click="handleDownload">
                {{ t('excel.export') }} Excel
            </el-button>
            <a href="https://github.com/rcyj-FED/vue3-composition-admin/tree/dev/src/views" style="margin-left:15px;" target="_blank">
                <el-tag type="info">Documentation</el-tag>
            </a>
        </div>

        <el-table v-loading="listLoading" :data="list" border element-loading-text="Loading..." fit highlight-current-row>
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
            <el-table-column align="center" label="Date" width="220">
                <template #default="{row}">
                    <i class="el-icon-time" />
                    <span>{{ row.timestamp }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { getArticles } from '@/apis/articles';
import { ArticleModel } from '@/model/articleModel';
import { formatJson } from '@/utils';
import { exportJson2Excel } from '@/utils/excel';
import FilenameOption from './components/FilenameOption.vue';
import AutoWidthOption from './components/AutoWidthOption.vue';
import BookTypeOption from './components/BookTypeOption.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
    components: {
        AutoWidthOption,
        FilenameOption,
        BookTypeOption
    },
    setup() {
        const { t } = useI18n();
        const dataMap = reactive({
            list: Array<ArticleModel>(),
            listLoading: true,
            downloadLoading: false,
            filename: '',
            autoWidth: true,
            bookType: 'xlsx'

        });

        const changeinput = (value: any) => {
            dataMap.bookType = value;
        };

        const fetchData = async () => {
            dataMap.listLoading = true;
            const data = await getArticles({ /* Your params here */ });
            dataMap.list = data?.data.items ?? [];
            // Just to simulate the time of the request
            setTimeout(() => {
                dataMap.listLoading = false;
            }, 0.5 * 1000);
        };
        const handleDownload = () => {
            dataMap.downloadLoading = true;
            const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date'];
            const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp'];
            const list = dataMap.list;
            const data = formatJson(filterVal, list);
            exportJson2Excel(tHeader, data, dataMap.filename !== '' ? dataMap.filename : undefined, undefined, undefined, dataMap.autoWidth, dataMap.bookType);
            dataMap.downloadLoading = false;
        };
        onMounted(() => {
            fetchData();
        });
        return { t, ...toRefs(dataMap), handleDownload, fetchData, changeinput };
    }
});
</script>

<style lang="scss">
.radio-label {
    font-size: 14px;
    line-height: 40px;
    padding: 0 12px 0 30px;
    color: #606266;
}
</style>
