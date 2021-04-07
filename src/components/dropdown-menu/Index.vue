<template>
    <div :class="{active: isActive}" class="share-dropdown-menu">
        <div class="share-dropdown-menu-wrapper">
            <span class="share-dropdown-menu-title" @click.self="clickTitle">{{ title }}</span>
            <div v-for="(item, index) of items" :key="index" class="share-dropdown-menu-item">
                <a v-if="item.href" :href="item.href" target="_blank">{{ item.title }}</a>
                <span v-else>{{ item.title }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
    props: {
        items: {
            type: Array,
            default: () => {
                return [];
            }
        },
        title: {
            type: String,
            default: 'vue'
        }
    },
    setup() {
        const state = reactive({
            isActive: false
        });
        const clickTitle = () => {
            state.isActive = !state.isActive;
        };
        return {
            ...toRefs(state), clickTitle
        };
    }
});
</script>

<style lang="scss" scoped>
$item-length: 10; // Should be no less than items.length
$transition-time: .1s;

.share-dropdown-menu {
    position: relative;
    z-index: 1;
    width: 250px;
    height: auto !important;

    &-title {
        font-size: 20px;
        line-height: 60px;
        z-index: 2;
        display: block;
        width: 100%;
        height: 60px;
        cursor: pointer;
        transform: translate3d(0, 0, 0);
        text-align: center;
        color: white;
        background: black;
    }

    &-wrapper {
        position: relative;
    }

    &-item {
        font-size: 18px;
        line-height: 60px;
        position: absolute;
        overflow: hidden;
        width: 100%;
        height: 60px;
        cursor: pointer;
        transition: transform 0.28s ease;
        text-align: center;
        opacity: 1;
        color: black;
        background: #e0e0e0;

        &:hover {
            color: white;
            background: black;
        }

        @for $i from 1 through $item-length {
            &:nth-of-type(#{$i}) {
                z-index: -1;
                transition-delay: $i*$transition-time;
                transform: translate3d(0, -60px, 0);
            }
        }
    }

    &.active {
        .share-dropdown-menu-wrapper {
            z-index: 1;
        }

        .share-dropdown-menu-item {
            @for $i from 1 through $item-length {
                &:nth-of-type(#{$i}) {
                    transition-delay: ($item-length - $i)*$transition-time;
                    transform: translate3d(0, ($i - 1)*60px, 0);
                }
            }
        }
    }
}
</style>
