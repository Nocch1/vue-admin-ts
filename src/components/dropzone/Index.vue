<template>
    <div>
        <VueDropzone :id="id" :options="dropzoneOptions" :use-custom-slot="true" @vdropzone-removed-file="dropzoneRemovedFile"
                     @vdropzone-success="dropzoneSuccess">
            <div class="dropzone-custom-content">
                <h3 :style="{color: themeColor}" class="dropzone-custom-title">
                    Drag and drop to upload content!
                </h3>
                <div class="subtitle">
                    ...or click to select a file from your computer
                </div>
            </div>
        </VueDropzone>
    </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue';
import { VueDropzone } from '@dragndrop/vue-dropzone';

export default defineComponent({
    components: {
        VueDropzone
    },
    setup() {
        const { ctx } = getCurrentInstance() as any;
        const { $message } = ctx.root;
        const dropzoneSuccess = (file: File, response: any) => {
            $message({ message: 'Upload success', type: 'success' });
            console.log(file, response);
        };

        const dropzoneRemovedFile = (file: File, error: Error, xhr: XMLHttpRequest) => {
            $message({ message: 'Delete success', type: 'success' });
            console.log(file, error, xhr);
        };

        return {
            dropzoneSuccess,
            dropzoneRemovedFile
        };
    }
});
</script>
<style lang="scss" scoped>
.dropzone-custom-content {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.subtitle {
    color: #314b5f;
}

.dropzone {
    min-height: 250px;
}
</style>
