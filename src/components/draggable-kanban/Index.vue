<template>
    <div class="board-column">
        <div class="board-column-header">
            {{ headerText }}
        </div>
        <draggable v-bind="$attrs" :list="list" class="board-column-content">
            <div v-for="element in list" :key="element.id" class="board-item">
                {{ element.name }} {{ element.id }}
            </div>
        </draggable>
    </div>
</template>

<script lang="ts">
import { VueDraggableNext } from 'vue-draggable-next';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        draggable: VueDraggableNext
    },
    props: {
        headerText: {
            type: String,
            default: 'header'
        },
        list: {
            type: Array,
            default: () => {
                return [];
            }
        },
        options: {
            type: Object,
            default: () => {
                return null;
            }
        }

    },
    setup(props) {
        console.log(props);
    }
});

</script>

<style lang="scss" scoped>
.board-column {
    overflow: hidden;
    min-width: 300px;
    height: auto;
    min-height: 100px;
    border-radius: 3px;
    background: #f0f0f0;

    .board-column-header {
        line-height: 50px;
        overflow: hidden;
        height: 50px;
        padding: 0 20px;
        text-align: center;
        color: #fff;
        border-radius: 3px 3px 0 0;
        background: #333;
    }

    .board-column-content {
        display: flex;
        overflow: hidden;
        align-items: center;
        flex-direction: column;
        justify-content: flex-start;
        height: auto;
        min-height: 60px;
        border: 10px solid transparent;

        .board-item {
            line-height: 54px;
            box-sizing: border-box;
            width: 100%;
            height: 64px;
            margin: 5px 0;
            padding: 5px 10px;
            cursor: pointer;
            text-align: left;
            background-color: #fff;
            box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
        }
    }
}
</style>
