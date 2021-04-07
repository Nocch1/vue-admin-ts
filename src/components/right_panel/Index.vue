<template>
    <div :style="{'top': buttonTop+'px','backgroundColor': theme}" class="handle-button" @click="show= true">
        <i class="el-icon-setting" />
    </div>
    <el-drawer v-model="show" :direction="direction" destroy-on-close size="300px" title="设置">
        <slot />
    </el-drawer>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        buttonTop: {
            type: Number,
            default: 250
        }
    },
    setup() {
        const show = ref(false);
        const store = useStore();
        const theme = computed(() => {
            return store.state.settings.theme;
        });
        return {
            show,
            theme
        };
    }
});
</script>

<style lang="scss" scoped>

.handle-button {
    font-size: 24px;
    line-height: 48px;
    position: absolute;
    z-index: 99;
    right: 0px;
    width: 48px;
    height: 48px;
    cursor: pointer;
    text-align: center;
    pointer-events: auto;
    color: #fff;
    border-radius: 6px 0 0 6px !important;

    i {
        font-size: 24px;
        line-height: 48px;
    }
}
</style>
