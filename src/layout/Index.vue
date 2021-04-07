<template>
    <div :class="classObj" class="app-wrapper">
        <div v-if="classObj.mobile && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
        <Sidebar class="sidebar-container" />
        <div :class="{hasTagsView: showTagsView}" class="main-container">
            <div :class="{'fixed-header': fixedHeader}">
                <Navbar />
                <TagsView v-if="showTagsView" />
            </div>
            <AppMain />
            <RightPanel v-if="showSettings">
                <Settings />
            </RightPanel>
        </div>
    </div>
</template>

<script lang="ts">
import { DeviceType } from '@/store/modules/app/state';
import { computed, defineComponent, onBeforeMount, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '@/store';
import { AppActionTypes } from '@/store/modules/app/action-types';
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components';
import RightPanel from '@/components/right_panel/Index.vue';
import resize from './resize';

export default defineComponent({
    name: 'Layout',
    components: {
        AppMain,
        Navbar,
        RightPanel,
        Settings,
        Sidebar,
        TagsView
    },
    setup() {
        const { t } = useI18n();
        const store = useStore();
        const { sidebar, device, addEventListenerOnResize, resizeMounted, removeEventListenerResize, watchRouter } = resize();
        const state = reactive({
            handleClickOutside: () => {
                store.dispatch(AppActionTypes.ACTION_CLOSE_SIDEBAR, false);
            }
        });

        const classObj = computed(() => {
            return {
                hideSidebar: !sidebar.value.opened,
                openSidebar: sidebar.value.opened,
                withoutAnimation: sidebar.value.withoutAnimation,
                mobile: device.value === DeviceType.Mobile
            };
        });

        const showSettings = computed(() => {
            return store.state.settings.showSettings;
        });
        const showTagsView = computed(() => {
            return store.state.settings.showTagsView;
        });
        const fixedHeader = computed(() => {
            return store.state.settings.fixedHeader;
        });

        watchRouter();
        onBeforeMount(() => {
            addEventListenerOnResize();
        });

        onMounted(() => {
            resizeMounted();
        });

        onBeforeUnmount(() => {
            removeEventListenerResize();
        });
        return {
            t,
            classObj,
            sidebar,
            showSettings,
            showTagsView,
            fixedHeader,
            ...toRefs(state)
        };
    }
});
</script>

<style lang="scss" scoped>
.app-wrapper {
    @include clearfix;
    position: relative;
    width: 100%;
    height: 100%;
}

.drawer-bg {
    position: absolute;
    z-index: 999;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    background: #000;
}

.main-container {
    position: relative;
    min-height: 100%;
    margin-left: $sideBarWidth;
    transition: margin-left .28s;
}

.sidebar-container {
    font-size: 0px;
    position: fixed;
    z-index: 1001;
    top: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    width: $sideBarWidth !important;
    height: 100%;
    transition: width 0.28s;
}

.fixed-header {
    position: fixed;
    z-index: 9;
    top: 0;
    right: 0;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
}

.hideSidebar {
    .main-container {
        margin-left: 54px;
    }

    .sidebar-container {
        width: 54px !important;
    }

    .fixed-header {
        width: calc(100% - 54px)
    }
}

/* for mobile response 适配移动端 */
.mobile {
    .main-container {
        margin-left: 0px;
    }

    .sidebar-container {
        width: $sideBarWidth !important;
        transition: transform .28s;
    }

    &.openSidebar {
        position: fixed;
        top: 0;
    }

    &.hideSidebar {
        .sidebar-container {
            transition-duration: 0.3s;
            transform: translate3d(-$sideBarWidth, 0, 0);
            pointer-events: none;
        }
    }

    .fixed-header {
        width: 100%;
    }
}

.withoutAnimation {
    .main-container,
    .sidebar-container {
        transition: none;
    }
}
</style>
