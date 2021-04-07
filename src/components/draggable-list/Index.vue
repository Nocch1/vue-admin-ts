<template>
    <div class="draggableList">
        <div :style="{width: list1width}" class="draggableList-list">
            <h3>{{ list1Title }}</h3>
            <draggable :list="list1" class="dragArea" group="article">
                <div v-for="element in list1" :key="element.id" class="list-complete-item">
                    <div class="list-complete-item-handle">
                        {{ element.id }}[{{ element.author }}] {{ element.title }}
                    </div>
                    <div style="position:absolute;right:0px;">
                        <span style="float: right ;margin-top: -20px;margin-right:5px;" @click="deleteEle(element)">
                            <i class="el-icon-delete" style="color:#ff4949" />
                        </span>
                    </div>
                </div>
            </draggable>
        </div>
        <div :style="{width: list2width}" class="draggableList-list">
            <h3>{{ list2Title }}</h3>
            <draggable :list="list2" class="dragArea" group="article">
                <div v-for="element in list2" :key="element.id" class="list-complete-item">
                    <div class="list-complete-item-handle2" @click="pushEle(element)">
                        {{ element.id }} [{{ element.author }}] {{ element.title }}
                    </div>
                </div>
            </draggable>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { VueDraggableNext } from 'vue-draggable-next';
import { ArticleModel } from '@/model/articleModel';

export default defineComponent({
    components: {
        draggable: VueDraggableNext
    },
    props: {
        list1: {
            type: [] as PropType<Array<ArticleModel>>,
            default: () => {
                return [];
            }
        },
        list2: {
            type: [] as PropType<Array<ArticleModel>>,
            default: () => {
                return [];
            }
        },
        list1Title: {
            type: String,
            default: 'list1'
        },
        list2Title: {
            type: String,
            default: 'list2'
        },
        list1width: {
            type: String,
            default: '48%'
        },
        list2width: {
            type: String,
            default: '48%'
        }
    },
    setup(props) {
        const isNotInList1 = (v: ArticleModel) => {
            return props.list1.every((k: any) => v.id !== k.id);
        };
        const isNotInList2 = (v: ArticleModel) => {
            return props.list2.every((k: any) => v.id !== k.id);
        };
        const deleteEle = (ele: ArticleModel) => {
            for (const item of props.list1) {
                if (item.id === ele.id) {
                    const index = props.list1.indexOf(item);
                    // eslint-disable-next-line vue/no-mutating-props
                    props.list1.splice(index, 1);
                    break;
                }
            }
            if (isNotInList2(ele)) {
                // eslint-disable-next-line vue/no-mutating-props
                props.list2.unshift(ele);
            }
        };
        const pushEle = (ele: ArticleModel) => {
            for (const item of props.list2) {
                if (item.id === ele.id) {
                    const index = props.list2.indexOf(item);
                    // eslint-disable-next-line vue/no-mutating-props
                    props.list2.splice(index, 1);
                    break;
                }
            }
            if (isNotInList1(ele)) {
                // eslint-disable-next-line vue/no-mutating-props
                props.list1.push(ele);
            }
        };
        return {
            deleteEle,
            pushEle,
            isNotInList1,
            isNotInList2
        };
    }
});

</script>

<style lang="scss" scoped>
.draggableList {
    padding-bottom: 40px;
    background: #fff;

    &:after {
        display: table;
        clear: both;
        content: "";
    }

    .draggableList-list {
        float: left;
        padding-bottom: 30px;

        &:first-of-type {
            margin-right: 2%;
        }

        .dragArea {
            min-height: 50px;
            margin-top: 15px;
            padding-bottom: 30px;
        }
    }
}

.list-complete-item {
    font-size: 14px;
    position: relative;
    margin-top: 4px;
    padding: 5px 12px;
    cursor: pointer;
    transition: all 1s;
    border: 1px solid #bfcbd9;
}

.list-complete-item-handle {
    overflow: hidden;
    margin-right: 50px;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.list-complete-item-handle2 {
    overflow: hidden;
    margin-right: 20px;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.list-complete-item.sortable-chosen {
    background: #4AB7BD;
}

.list-complete-item.sortable-ghost {
    background: #30B08F;
}

.list-complete-enter,
.list-complete-leave-active {
    opacity: 0;
}
</style>
