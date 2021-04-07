<template>
    <section class="app-main">
        <transition mode="out-in" name="fade-transform">
            <keep-alive :include="cachedViews">
                <router-view :key="key" />
            </keep-alive>
        </transition>
    </section>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    setup() {
        const store = useStore();
        const route = useRoute();
        const cachedViews = () => {
            return store.state.tagViews.cachedViews;
        };
        const key = () => {
            return route.path;
        };
        return {
            cachedViews,
            key
        };
    }
});
</script>

<style lang="scss" scoped>
.app-main {
    /* 50= navbar  50  */
    position: relative;
    overflow: hidden;
    width: 100%;
    min-height: calc(100vh - 50px);
}

.fixed-header + .app-main {
    overflow: auto;
    height: 100vh;
    padding-top: 50px;
}

.hasTagsView {
    .app-main {
        /* 84 = navbar + tags-view = 50 + 34 */
        min-height: calc(100vh - 84px);
    }

    .fixed-header + .app-main {
        padding-top: 84px;
    }
}
</style>
