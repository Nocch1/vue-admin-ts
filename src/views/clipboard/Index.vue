<template>
    <div class="app-container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="use clipboard directly" name="directly">
                <el-input v-model="inputData" placeholder="Please input" style="width:400px; max-width:100%;" />
                <el-button icon="el-icon-document" type="primary" @click="handleClipboard(inputData, $event)">
                    copy
                </el-button>
            </el-tab-pane>
            <el-tab-pane label="use clipboard by v-directive" name="v-directive">
                <el-input v-model="inputData" placeholder="Please input" style="width:400px; max-width:100%;" />
                <el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" icon="el-icon-document" type="primary">
                    copy
                </el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { clipboardSuccess, handleClipboard } from '@/utils/clipboard'; // use clipboard directly

export default defineComponent({
    setup() {
        const dataMap = reactive({
            activeName: 'directly',
            inputData: 'https://github.com/Armour/vue-typescript-admin-template',
            clipboardSuccess: clipboardSuccess,
            handleClipboard: handleClipboard
        });

        return { ...toRefs(dataMap) };
    }
});
</script>
