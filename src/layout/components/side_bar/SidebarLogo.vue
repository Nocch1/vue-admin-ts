<template>
    <div :class="{'collapse': collapse}" class="sidebar-logo-container">
        <transition name="sidebarLogoFade">
            <router-link v-if="false" key="collapse" class="sidebar-logo-link" to="/">
                <img class="sidebar-logo" src="favicon.ico">
            </router-link>
            <router-link v-else key="expand" class="sidebar-logo-link" to="/">
                <img class="sidebar-logo" src="favicon.ico">
                <h1 class="sidebar-title">
                    {{ title }}
                </h1>
            </router-link>
        </transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import settings from '@/config/default/setting.config';

export default defineComponent({
    props: {
        collapse: {
            type: Boolean,
            default: true
        }
    },
    setup() {
        const title = settings.title;
        return {
            title
        };
    }
});
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
    transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
    opacity: 0;
}

.sidebar-logo-container {
    line-height: 50px;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 50px;
    text-align: center;
    background: $menuBg;

    & .sidebar-logo-link {
        width: 100%;
        height: 100%;

        & .sidebar-logo {
            width: 32px;
            height: 32px;
            margin-right: 0px;
            vertical-align: middle;
        }

        & .sidebar-title {
            font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
            font-size: 14px;
            font-weight: 600;
            line-height: 50px;
            display: inline-block;
            margin: 0;
            vertical-align: middle;
            color: #fff;
        }
    }

    &.collapse {
        .sidebar-logo {
            margin-right: 12px;
        }
    }
}
</style>
