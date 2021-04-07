<template>
    <div class="navbar">
        <Hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggle-click="toggleSideBar" />
        <BreadCrumb id="breadcrumb-container" class="breadcrumb-container" />
        <div class="right-menu">
            <template v-if="device !== 'mobile'">
                <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->
                <Screenfull class="right-menu-item hover-effect" />
                <el-tooltip :content="t('navbar.size')" effect="dark" placement="bottom">
                    <SizeSelect class="right-menu-item hover-effect" />
                </el-tooltip>
                <LangSelect class="right-menu-item hover-effect" />
            </template>
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar">
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <router-link to="/profile/">
                            <el-dropdown-item>
                                {{ t('navbar.profile') }}
                            </el-dropdown-item>
                        </router-link>
                        <router-link to="/">
                            <el-dropdown-item>
                                {{ t('navbar.dashboard') }}
                            </el-dropdown-item>
                        </router-link>
                        <a href="https://github.com/rcyj-FED/vue3-composition-admin" target="_blank">
                            <el-dropdown-item>
                                {{ t('navbar.github') }}
                            </el-dropdown-item>
                        </a>
                        <a href="https://armour.github.io/vue-typescript-admin-docs/" target="_blank">
                            <el-dropdown-item>Docs</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided @click="logout">
                            <span style="display:block;">
                                {{ t('navbar.logOut') }}
                            </span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '@/components/bread-crumb/Index.vue';
import Hamburger from '@/components/hamburger/Index.vue';
import LangSelect from '@/components/lang_select/Index.vue';
import Screenfull from '@/components/screenfull/Index.vue';
import SizeSelect from '@/components/size_select/Index.vue';
import { useStore } from '@/store';
import { AppActionTypes } from '@/store/modules/app/action-types';
import { UserActionTypes } from '@/store/modules/user/action-types';

import { computed, reactive, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

export default {
    components: {
        BreadCrumb,
        Hamburger,
        Screenfull,
        LangSelect,
        SizeSelect
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const { t } = useI18n();
        const sidebar = computed(() => {
            return store.state.app.sidebar;
        });
        const device = computed(() => {
            return store.state.app.device.toString();
        });
        const avatar = computed(() => {
            return store.state.user.avatar;
        });
        const state = reactive({
            toggleSideBar: () => {
                store.dispatch(AppActionTypes.ACTION_TOGGLE_SIDEBAR, false);
            },
            logout: () => {
                useStore().dispatch(UserActionTypes.ACTION_LOGIN_OUT);
                router.push(`/login?redirect=${route.fullPath}`).catch(err => {
                    console.warn(err);
                });
            }
        });
        return {
            sidebar,
            device,
            avatar,
            ...toRefs(state),
            t
        };
    }
};
</script>

<style lang="scss" scoped>
.navbar {
    position: relative;
    overflow: hidden;
    height: 50px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 46px;
        float: left;
        height: 100%;
        padding: 0 15px;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }

    .right-menu {
        line-height: 50px;
        float: right;
        height: 100%;

        &:focus {
            outline: none;
        }

        .right-menu-item {
            font-size: 18px;
            display: inline-block;
            height: 100%;
            padding: 0 8px;
            vertical-align: text-bottom;
            color: #5a5e66;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            .avatar-wrapper {
                position: relative;
                margin-top: 5px;
                margin-right: 16px;
                margin-left: 16px;

                .user-avatar {
                    width: 40px;
                    height: 40px;
                    cursor: pointer;
                    border-radius: 10px;
                }

                .el-icon-caret-bottom {
                    font-size: 12px;
                    position: absolute;
                    top: 25px;
                    right: -20px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
