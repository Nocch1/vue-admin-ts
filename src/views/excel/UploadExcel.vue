<template>
    <div class="app-container">
        <UploadExcelComponent :before-upload="beforeUpload" :on-success="handleSuccess" />
        <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
            <el-table-column v-for="item of tableHeader" :key="item" :label="item" :prop="item" />
        </el-table>
    </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { defineComponent, reactive, toRefs } from 'vue';
import UploadExcelComponent from '@/components/up-excel/Index.vue';

export default defineComponent({
    components: {
        UploadExcelComponent
    },
    setup() {
        const dataMap = reactive({

            tableData: [],
            tableHeader: Array<String>(),
            beforeUpload: (file: File) => {
                const isLt1M = file.size / 1024 / 1024 < 1;
                if (isLt1M) {
                    return true;
                }
                ElMessage.warning('Please do not upload files larger than 1m in size.');
                return false;
            },

            handleSuccess: ({ results, header }: { results: any, header: string[] }) => {
                dataMap.tableData = results;
                dataMap.tableHeader = header;
            }

        });
        return { ...toRefs(dataMap) };
    }
});
</script>
