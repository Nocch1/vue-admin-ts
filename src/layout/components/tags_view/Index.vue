<template>
    <div id="tags-view-container" class="tags-view-container">
        <ScrollPane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
            <router-link v-for="tag in visitedViews" :key="tag.path" ref="tag" :class="isActive(tag) ? 'active' : ''"
                         :to="{path: tag.path, query: tag.query, fullPath: tag.fullPath}" class="tags-view-item" tag="span"
                         @click.middle="!isAffix(tag)?closeSelectedTag(tag):''" @contextmenu.prevent="openMenu(tag, $event)">
                {{ t('route.' + tag.meta.title) }}
                <span v-if="!isAffix(tag)" class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
            </router-link>
        </ScrollPane>
        <ul v-show="visible" :style="{left: left+'px', top: top+'px'}" class="contextmenu">
            <li @click="refreshSelectedTag(selectedTag)">
                {{ t('tagsView.refresh') }}
            </li>
            <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
                {{ t('tagsView.close') }}
            </li>
            <li @click="closeOthersTags">
                {{ t('tagsView.closeOthers') }}
            </li>
            <li @click="closeAllTags(selectedTag)">
                {{ t('tagsView.closeAll') }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import path from 'path';
import { useStore } from '@/store';
import { TagsActionTypes } from '@/store/modules/tagsview/action-types';
import { TagView } from '@/store/modules/tagsview/state';
import { computed, defineComponent, getCurrentInstance, nextTick, onBeforeMount, reactive, ref, toRefs, watch } from 'vue';
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import ScrollPane from './ScrollPane.vue';

export default defineComponent({
    components: {
        ScrollPane
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const instance = getCurrentInstance();
        const currentRoute = useRoute();
        const { t } = useI18n();
        const scrollPaneRef = ref(null);
        const { ctx } = instance as any;

        const toLastView = (visitedViews: TagView[], view: TagView) => {
            const latestView = visitedViews.slice(-1)[0];
            if (latestView !== undefined && latestView.fullPath !== undefined) {
                router.push(latestView.fullPath).catch(err => {
                    console.warn(err);
                });
            } else {
                // Default redirect to the home page if there is no tags-view, adjust it if you want
                if (view.name === 'Dashboard') {
                    // to reload home page
                    router.push({ path: '/redirect' + view.fullPath }).catch(err => {
                        console.warn(err);
                    });
                } else {
                    router.push('/').catch(err => {
                        console.warn(err);
                    });
                }
            }
        };

        const state = reactive({
            visible: false,
            top: 0,
            left: 0,
            selectedTag: {} as TagView,
            affixTags: [] as TagView[],
            isActive: (route: TagView) => {
                return route.path === currentRoute.path;
            },
            isAffix: (tag: TagView) => {
                return tag.meta && tag.meta.affix;
            },
            refreshSelectedTag: (view: TagView) => {
                store.dispatch(TagsActionTypes.ACTION_DEL_CACHED_VIEW, view);
                const { fullPath } = view;
                nextTick(() => {
                    router.replace({ path: '/redirect' + fullPath }).catch(err => {
                        console.warn(err);
                    });
                });
            },
            closeSelectedTag: (view: TagView) => {
                store.dispatch(TagsActionTypes.ACTION_DEL_VIEW, view);
                if (state.isActive(view)) {
                    toLastView(store.state.tagViews.visitedViews, view);
                }
            },
            closeOthersTags: () => {
                if (state.selectedTag.fullPath !== currentRoute.path && state.selectedTag.fullPath !== undefined) {
                    router.push(state.selectedTag.fullPath).catch(err => {
                        console.log(err);
                    });
                }
                store.dispatch(TagsActionTypes.ACTION_DEL_OTHER_VIEW, state.selectedTag as TagView);
            },
            closeAllTags: (view: TagView) => {
                store.dispatch(TagsActionTypes.ACTION_DEL_ALL_VIEWS, undefined);
                if (state.affixTags.some(tag => tag.path === currentRoute.path)) {
                    return;
                }
                toLastView(store.state.tagViews.visitedViews, view);
            },
            openMenu: (tag: TagView, e: MouseEvent) => {
                const menuMinWidth = 105;
                const offsetLeft = ctx.$el.getBoundingClientRect().left; // container margin left
                const offsetWidth = ctx.$el.offsetWidth; // container width
                const maxLeft = offsetWidth - menuMinWidth; // left boundary
                const left = e.clientX - offsetLeft + 15; // 15: margin right
                if (left > maxLeft) {
                    state.left = maxLeft;
                } else {
                    state.left = left;
                }
                state.top = e.clientY;
                state.visible = true;
                state.selectedTag = tag;
            },
            closeMenu: () => {
                state.visible = false;
            },
            handleScroll: () => {
                state.closeMenu();
            }
        });

        const visitedViews = computed(() => {
            return store.state.tagViews.visitedViews;
        });
        const routes = computed(() => store.state.permission.routes);

        const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
            let tags: TagView[] = [];

            routes.forEach(route => {
                if (route.meta && route.meta.affix) {
                    const tagPath = path.resolve(basePath, route.path);
                    tags.push({
                        fullPath: tagPath,
                        path: tagPath,
                        name: route.name,
                        meta: { ...route.meta }
                    });
                }

                if (route.children) {
                    const childTags = filterAffixTags(route.children, route.path);
                    if (childTags.length >= 1) {
                        tags = tags.concat(childTags);
                    }
                }
            });
            return tags;
        };

        const initTags = () => {
            state.affixTags = filterAffixTags(routes.value);
            for (const tag of state.affixTags) {
                // Must have tag name
                if (tag.name) {
                    store.dispatch(TagsActionTypes.ACTION_ADD_VISITED_VIEW, tag as TagView);
                }
            }
        };

        const addTags = () => {
            if (currentRoute.name) {
                console.log(currentRoute.name, 'currentRoute.namecurrentRoute.namecurrentRoute.namecurrentRoute.namecurrentRoute.namecurrentRoute.namecurrentRoute.namecurrentRoute.name');
                store.dispatch(TagsActionTypes.ACTION_ADD_VIEW, currentRoute);
            }
            return false;
        };

        const moveToCurrentTag = () => {
            const tags = instance?.refs.tag as any[];
            nextTick(() => {
                if (tags === null || tags === undefined || !Array.isArray(tags)) {
                    return;
                }
                for (const tag of tags) {
                    if ((tag.to as TagView).path === currentRoute.path) {
                        (scrollPaneRef.value as any).moveToCurrentTag(tag);
                        // When query is different then update
                        if ((tag.to as TagView).fullPath !== currentRoute.fullPath) {
                            store.dispatch(TagsActionTypes.ACTION_UPDATE_VISITED_VIEW, currentRoute);
                        }
                    }
                }
            });
        };

        watch(() => currentRoute.name, () => {
            if (currentRoute.name !== 'Login') {
                addTags();
                moveToCurrentTag();
            }
        });

        // watch(state.visible.value, (value) => {
        //   if (value) {
        //     document.body.addEventListener('click', state.closeMenu)
        //   } else {
        //     document.body.removeEventListener('click', state.closeMenu)
        //   }
        // })

        // life cricle
        onBeforeMount(() => {
            initTags();
            addTags();
        });

        return {
            visitedViews,
            routes,
            scrollPaneRef,
            t,
            ...toRefs(state)
        };
    }
});
</script>

<style lang="scss" scoped>

// Reset element css of el-icon-close
.tags-view-wrapper {
    .tags-view-item {
        .el-icon-close {
            width: 16px;
            height: 16px;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
            transform-origin: 100% 50%;
            text-align: center;
            vertical-align: 2px;
            border-radius: 50%;

            &:before {
                display: inline-block;
                transform: scale(0.6);
                vertical-align: -3px;
            }

            &:hover {
                color: #fff;
                background-color: #b4bccc;
            }
        }
    }
}
</style>
<style lang="scss" scoped>
.tags-view-container {
    width: 100%;
    height: 34px;
    border-bottom: 1px solid #d8dce5;
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

    .tags-view-wrapper {
        .tags-view-item {
            font-size: 12px;
            line-height: 26px;
            position: relative;
            display: inline-block;
            height: 26px;
            margin-top: 4px;
            margin-left: 5px;
            padding: 0 8px;
            cursor: pointer;
            color: #495060;
            border: 1px solid #d8dce5;
            background: #fff;

            &:first-of-type {
                margin-left: 15px;
            }

            &:last-of-type {
                margin-right: 15px;
            }

            &.active {
                color: #fff;
                border-color: #42b983;
                background-color: #42b983;

                &::before {
                    position: relative;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    margin-right: 2px;
                    content: "";
                    border-radius: 50%;
                    background: #fff;
                }
            }
        }
    }

    .contextmenu {
        font-size: 12px;
        font-weight: 400;
        position: absolute;
        z-index: 3000;
        margin: 0;
        padding: 5px 0;
        list-style-type: none;
        color: #333;
        border-radius: 4px;
        background: #fff;
        box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;

            &:hover {
                background: #eee;
            }
        }
    }
}
</style>
