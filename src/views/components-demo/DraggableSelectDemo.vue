<template>
    <div class="components-container">
        <draggable-select :value="value" multiple placeholder="Please select" style="width:500px;" @changeVal="changeVal">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </draggable-select>
        <div style="margin-top:30px;">
            <el-tag v-for="item of value" :key="item" style="margin-right:15px;">
                {{ item }}
            </el-tag>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import draggableSelect from '@/components/draggable-select/Index.vue';

export default defineComponent({
    components: {
        draggableSelect
    },
    setup() {
        const state = reactive({
            value: ['Apple', 'Banana', 'Orange'],
            options: [
                {
                    value: 'Apple',
                    label: 'Apple'
                },
                {
                    value: 'Banana',
                    label: 'Banana'
                },
                {
                    value: 'Orange',
                    label: 'Orange'
                },
                {
                    value: 'Pear',
                    label: 'Pear'
                },
                {
                    value: 'Strawberry',
                    label: 'Strawberry'
                }
            ],
            changeVal: (val: any) => {
                state.value = val;
            }
        });
        return {
            ...toRefs(state)
        };
    }
});
</script>
