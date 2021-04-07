<template>
    <div class="upload-container">
        <el-button :style="{background: color, borderColor: color}" icon="el-icon-upload" size="mini" type="primary" @click="dialogVisible = true">
            上传
        </el-button>
        <el-dialog v-model="dialogVisible" :modal-append-to-body="false">
            <el-upload :before-upload="beforeUpload" :file-list="defaultFileList" :multiple="true" :on-remove="handleRemove"
                       :on-success="handleSuccess" :show-file-list="true" action="https://httpbin.org/post" class="editor-slide-upload"
                       list-type="picture-card">
                <el-button size="small" type="primary">
                    Click upload
                </el-button>
            </el-upload>
            <el-button @click="dialogVisible = false">
                Cancel
            </el-button>
            <el-button type="primary" @click="handleSubmit">
                Confirm
            </el-button>
        </el-dialog>
    </div>
</template>

<script lang="ts">

import { defineComponent, reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus';

export interface UploadObject {
    hasSuccess: boolean
    uid: number
    url: string
    width: number
    height: number
}

export default defineComponent({
    props: {
        color: {
            type: String,
            default: ''
        }

    },
    emits: ['success-callback'],
    setup(_, ctx) {
        let listObj: { [key: string]: UploadObject } = {};
        const dataMap = reactive({
            dialogVisible: false,
            defaultFileList: [],
            checkAllSuccess: () => {
                return Object.keys(listObj).every(item => listObj[item].hasSuccess);
            },
            handleSubmi: () => {
                const arr = Object.keys(listObj).map(v => listObj[v]);
                if (!dataMap.checkAllSuccess()) {
                    ElMessage.success('Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!');
                }
                ctx.emit('success-callback', arr);
                listObj = {};
                dataMap.defaultFileList = [];
                dataMap.dialogVisible = false;
            },

            handleSuccess: (response: any, file: any) => {
                const uid = file.uid;
                const objKeyArr = Object.keys(listObj);
                for (let i = 0, len = objKeyArr.length; i < len; i++) {
                    if (listObj[objKeyArr[i]].uid === uid) {
                        listObj[objKeyArr[i]].url = response.files.file;
                        listObj[objKeyArr[i]].hasSuccess = true;
                        return;
                    }
                }
            },
            handleRemove: (file: any) => {
                const uid = file.uid;
                const objKeyArr = Object.keys(listObj);
                for (let i = 0, len = objKeyArr.length; i < len; i++) {
                    if (listObj[objKeyArr[i]].uid === uid) {
                        delete listObj[objKeyArr[i]];
                        return;
                    }
                }
            },

            beforeUpload: (file: any) => {
                const fileName = file.uid;
                const img = new Image();
                img.src = window.URL.createObjectURL(file);
                img.onload = () => {
                    listObj[fileName] = {
                        hasSuccess: false,
                        uid: file.uid,
                        url: '',
                        width: img.width,
                        height: img.height
                    };
                };
            },
            handleSubmit() {
                const arr = Object.keys(listObj).map(v => listObj[v]);
                if (!dataMap.checkAllSuccess()) {
                    ElMessage.warning('Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!');
                    return;
                }
                ctx.emit('success-callback', arr);
                listObj = {};
                dataMap.defaultFileList = [];
                dataMap.dialogVisible = false;
            }
        });

        return { ...toRefs(dataMap), listObj };
    }
});
</script>

<style lang="scss">
.editor-slide-upload {
    .el-upload--picture-card {
        width: 100%;
    }
}
</style>

<style lang="scss" scoped>
.editor-slide-upload {
    margin-bottom: 20px;
}
</style>
