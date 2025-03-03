<template>
    <li :class="{completed: todo.done, editing: editing}" class="todo">
        <div class="view">
            <input :checked="todo.done" class="toggle" type="checkbox" @change="toggleTodo(todo)">
            <label @dblclick="editing = true" v-text="todo.text" />
            <button class="destroy" @click="deleteTodo( todo )" />
        </div>
        <input v-show="editing" v-focus="editing" :value="todo.text" class="edit" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit">
    </li>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';

export interface TodoItem {
    text: string
    done: boolean
}

export default defineComponent({
    directives: {
        focus: {
            // 指令的定义
            mounted(el) {
                el.focus();
            }
        }
    },
    props: {
        todo: {
            type: Object as PropType<TodoItem>,
            default: {
                text: '',
                done: false
            }
        }

    },
    emits: ['toggle-todo', 'edit-todo', 'delete-todo'],
    setup(props, { emit }) {
        const editing = ref(false);
        const deleteTodo = (todo: TodoItem) => {
            emit('delete-todo', todo);
        };
        const editTodo = ({ todo, value }: { todo: TodoItem, value: string }) => {
            emit('edit-todo', { todo, value });
        };
        const toggleTodo = (todo: TodoItem) => {
            emit('toggle-todo', todo);
        };

        const doneEdit = (e: KeyboardEvent) => {
            const value = (e.target as HTMLInputElement).value.trim();
            const todo = props.todo;
            if (!value) {
                deleteTodo(todo);
            } else if (editing.value) {
                editTodo({
                    todo,
                    value
                });
                editing.value = false;
            }
        };

        const cancelEdit = (e: KeyboardEvent) => {
            (e.target as HTMLInputElement).value = props.todo.text;
            editing.value = false;
        };

        return {
            editing,
            deleteTodo,
            editTodo,
            toggleTodo,
            doneEdit,
            cancelEdit
        };
    }
});
</script>
