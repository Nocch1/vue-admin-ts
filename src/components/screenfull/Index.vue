<template>
    <div id="screenfull">
        <div v-if="isFullscreen" @click="click">
            <svg aria-hidden="true" class="icon" font-size="20px">
                <use xlink:href="#iconexitfullscreen" />
            </svg>
        </div>
        <div v-else @click="click">
            <svg aria-hidden="true" class="icon" font-size="20px">
                <use xlink:href="#iconfullscreen" />
            </svg>
        </div>
    </div>
</template>

<script lang="ts">
import screenfull from 'screenfull';
import { defineComponent, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue';
import { ElMessage } from 'element-plus';

const sf = screenfull;
export default defineComponent({
    setup() {
        const state = reactive({
            isFullscreen: false,
            click: () => {
                if (!sf.isEnabled) {
                    ElMessage({
                        message: 'you browser can not work',
                        type: 'warning'
                    });
                    return false;
                }
                sf.toggle();
            }
        });
        const change = () => {
            if (sf.isEnabled) {
                state.isFullscreen = sf.isFullscreen;
            }
        };
        onMounted(() => {
            if (sf.isEnabled) {
                sf.on('change', change);
            }
        });

        onBeforeUnmount(() => {
            if (sf.isEnabled) {
                sf.off('change', change);
            }
        });

        return {
            ...toRefs(state)
        };
    }
});

</script>
