<template>
    <div style="display:inline-block;">
        <label class="radio-label" style="padding-left:0;">Filename: </label>
        <el-input v-model="filename" :placeholder="t('excel.placeholder')" prefix-icon="el-icon-document" style="width:345px;" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    emits: ['input'],
    setup(props, ctx) {
        const dataMap = reactive({});
        const { t } = useI18n();
        const filename = computed({
            get: () => {
                return props.value;
            },

            set: (value) => {
                ctx.emit('input', value);
            }
        });

        return { t, ...toRefs(dataMap), filename };
    }
});
</script>
