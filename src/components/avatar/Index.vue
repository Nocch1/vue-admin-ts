<template>
    <ImageCropUpload v-model="show" :field="field" :headers="headers" :height="height" :params="params" :url="url" :width="width"
                     :with-credentials="true" img-format="png" @src-file-set="srcFileSet" @crop-success="cropSuccess"
                     @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import ImageCropUpload from 'vue-image-crop-upload';
import { AppModule } from '@/store/modules/app/app';

export default defineComponent({
  components: {
    ImageCropUpload
  },
  props: {
    value: {
      type!: Array,
      required: true
    },
    url: {
      type!: String,
      required: true
    },
    field: {
      type!: String,
      required: true
    },
    width: {
      type!: Number,
      default: 300
    },
    height: {
      type!: Number,
      default: 300
    },
    params: {
      type!: Object,
      default: () => null
    },
    headers: {
      type!: Object,
      default: () => null
    }
  },
  emits: ['input', 'src-file-set', 'crop-success', 'crop-upload-success', 'crop-upload-fail'],
  setup(props, contex) {
    const languageTypeList: { [key: string]: string } = {
        en: 'en',
        zh: 'zh'
    };
    const show = computed({
        get: () => {
            return props.value;
        },
        set: (value) => {
            contex.emit('input', [...value]);
        }
    });
    const language = computed(() => {
        return languageTypeList[AppModule.language];
    });
    const srcFileSet = (fileName: string, fileType: string, fileSize: number) => {
        contex.emit('src-file-set', fileName, fileType, fileSize);
    };
    const cropSuccess = (imgDataUrl: string, field: string) => {
        contex.emit('crop-success', imgDataUrl, field);
    };
    const cropUploadSuccess = (jsonData: any, field: string) => {
        contex.emit('crop-upload-success', jsonData, field);
    };
    const cropUploadFail = (status: boolean, field: string) => {
        contex.emit('crop-upload-fail', status, field);
    };
    return {
        show,
        language,
        srcFileSet,
        cropSuccess,
        cropUploadSuccess,
        cropUploadFail
    };
}
})
</script>
