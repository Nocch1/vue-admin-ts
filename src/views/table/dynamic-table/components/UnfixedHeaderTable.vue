<template>
    <div class="app-container">
        <div class="filter-container">
            <el-checkbox-group v-model="formThead">
                <el-checkbox label="apple">
                    apple
                </el-checkbox>
                <el-checkbox label="banana">
                    banana
                </el-checkbox>
                <el-checkbox label="orange">
                    orange
                </el-checkbox>
            </el-checkbox-group>
        </div>

        <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
            <el-table-column label="fruitName" prop="name" width="180" />
            <el-table-column v-for="fruit in formThead" :key="fruit" :label="fruit">
                <template #default="{row}">
                    {{ row[fruit] }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
    setup() {
        const dataMap = reactive({
            tableData: [
                {
                    name: 'fruit-1',
                    apple: 'apple-10',
                    banana: 'banana-10',
                    orange: 'orange-10'
                },
                {
                    name: 'fruit-2',
                    apple: 'apple-20',
                    banana: 'banana-20',
                    orange: 'orange-20'
                }
            ],
            formThead: ['apple', 'banana']
        });

        return { ...toRefs(dataMap) };
    }
});

</script>
