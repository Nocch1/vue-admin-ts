<template>
    <div :class="{'has-logo': showLogo}">
        <SidebarLogo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu :active-text-color="menuActiveTextColor" :background-color="variables.menuBg" :collapse="!isCollapse"
                     :default-active="activeMenu" :text-color="variables.menuText" :unique-opened="false" mode="vertical">
                <SidebarItem v-for="route in routes" :key="route.path" :base-path="route.path" :is-collapse="isCollapse" :item="route" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import SidebarItem from './SidebarItem.vue';
import SidebarLogo from './SidebarLogo.vue';
import variables from '@/styles/_variables.scss';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';

export default defineComponent({
    components: {
        SidebarItem,
        SidebarLogo
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const sidebar = computed(() => {
            return store.state.app.sidebar;
        });
        const routes = computed(() => {
            return store.state.permission.routes;
        });
        const showLogo = computed(() => {
            return store.state.settings.showSidebarLogo;
        });

        const menuActiveTextColor = computed(() => {
            console.log(store.state.settings.sidebarTextTheme);

            if (store.state.settings.sidebarTextTheme) {
                return store.state.settings.theme;
            } else {
                return variables.menuActiveText;
            }
        });

        const activeMenu = computed(() => {
            const { meta, path } = route;
            if (meta !== null || meta !== undefined) {
                if (meta.activeMenu) {
                    return meta.activeMenu;
                }
            }
            return path;
        });

        const isCollapse = computed(() => {
            return sidebar.value.opened;
        });

        return {
            sidebar,
            routes,
            showLogo,
            menuActiveTextColor,
            variables,
            activeMenu,
            isCollapse
        };
    }
});
</script>

<style lang="scss">
.sidebar-container {
    // reset element-ui css
    .horizontal-collapse-transition {
        transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
    }

    .scrollbar-wrapper {
        overflow-x: hidden !important;
    }

    .el-scrollbar__view {
        height: 100%
    }

    .el-scrollbar__bar {
        &.is-vertical {
            right: 0px;
        }

        &.is-horizontal {
            display: none;
        }
    }
}
</style>

<style lang="scss" scoped>
.el-scrollbar {
    height: 100%
}

.has-logo {
    .el-scrollbar {
        height: calc(100% - 50px);
    }
}

.el-menu {
    width: 100% !important;
    height: 100%;
    border: none;
}
</style>
