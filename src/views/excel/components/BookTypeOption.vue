<template>
    <div style="display:inline-block;">
        <label class="radio-label">Book Type: </label>
        <el-select v-model="bookType" style="width:120px;" @change="booktypeChange">
            <el-option v-for="item in options" :key="item" :label="item" :value="item" />
        </el-select>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
    props: {
        value: {
            type: String,
            default: ''
        }

    },
    emits: ['changeinput'],
    setup(props, ctx) {
        const dataMap = reactive({
            options: [
                'xlsx', 'csv', 'txt'
            ]
        });

        const bookType = computed({
            get: () => {
                return props.value;
            },
            set: (value) => {
                ctx.emit('changeinput', value);
            }
        });

        const booktypeChange = (value: any) => {
            console.log(value);
            ctx.emit('changeinput', value);
        };
        return { ...toRefs(dataMap), bookType, booktypeChange };
    }
});
</script>
