<template>
    <div class="components-container board">
        <DraggableKanban :key="1" :group="group" :list="list1" class="kanban todo" header-text="Todo" />
        <DraggableKanban :key="2" :group="group" :list="list2" class="kanban working" header-text="Working" />
        <DraggableKanban :key="3" :group="group" :list="list3" class="kanban done" header-text="Done" />
    </div>
</template>

<script lang="ts">
import DraggableKanban from '@/components/draggable-kanban/Index.vue';
import { defineComponent, reactive, toRefs } from 'vue';

export default defineComponent({
    components: {
        DraggableKanban
    },
    setup() {
        const dataMap = reactive({
            group: 'mission',
            list1: [
                { name: 'Mission', id: 1 },
                { name: 'Mission', id: 2 },
                { name: 'Mission', id: 3 },
                { name: 'Mission', id: 4 }
            ],
            list2: [
                { name: 'Mission', id: 5 },
                { name: 'Mission', id: 6 },
                { name: 'Mission', id: 7 }
            ],
            list3: [
                { name: 'Mission', id: 8 },
                { name: 'Mission', id: 9 },
                { name: 'Mission', id: 10 }
            ]
        });
        return { ...toRefs(dataMap) };
    }
});
</script>

<style lang="scss">
.kanban {
    &.todo {
        .board-column-header {
            background: #4A9FF9;
        }
    }

    &.working {
        .board-column-header {
            background: #f9944a;
        }
    }

    &.done {
        .board-column-header {
            background: #2ac06d;
        }
    }
}
</style>
<style lang="scss" scoped>
.board {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-around;
    width: 1000px;
    margin-left: 20px;
}
</style>
