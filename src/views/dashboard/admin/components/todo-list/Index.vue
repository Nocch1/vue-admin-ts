<template>
    <section class="todoapp">
        <!-- header -->
        <header class="header">
            <input autocomplete="off" class="new-todo" placeholder="Todo List" @keyup.enter="addTodo">
        </header>
        <!-- main section -->
        <section v-show="todos.length" class="main">
            <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({done: !allChecked})">
            <label for="toggle-all" />
            <ul class="todo-list">
                <Todo v-for="(todo, index) in filteredTodos" :key="index" :todo="todo" @toggle-todo="toggleTodo" @edit-todo="editTodo"
                      @delete-todo="deleteTodo" />
            </ul>
        </section>
        <!-- footer -->
        <footer v-show="todos.length" class="footer">
            <span class="todo-count">
                <strong>{{ remaining }}</strong>
                {{ pluralize(remaining, 'item') }} left
            </span>
            <ul class="filters">
                <li v-for="(val, key) in getFilters" :key="key">
                    <a :class="{selected: visibility === key}" @click.prevent="visibility = key">{{ capitalize(key) }}</a>
                </li>
            </ul>
            <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
              Clear completed
            </button> -->
        </footer>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import Todo, { TodoItem } from './Todo.vue';
import storage, { StorageType } from '@/utils/storage';

const STORAGE_KEY = 'todos';

export default defineComponent({
    components: {
        Todo
    },
    setup() {
        const filters: { [key: string]: Function } = {
            all: (todos: TodoItem[]) => todos,
            active: (todos: TodoItem[]) => todos.filter(todo => !todo.done),
            completed: (todos: TodoItem[]) => todos.filter(todo => todo.done)
        };
        const getFilters = computed(() => filters);

        const visibility = ref('all');
        let todos = reactive([
            { text: 'star this repository', done: true },
            { text: 'fork this repository', done: false },
            { text: 'settings', done: false },
            { text: 'theme', done: false },
            { text: 'doc', done: false },
            { text: 'gitpages', done: false }
        ]);

        const pluralize = (n: number, s: string) => {
            return n === 1 ? s : s + 's';
        };

        const capitalize = (s: string) => {
            return s.charAt(0).toUpperCase() + s.slice(1);
        };

        const allChecked = computed(() => {
            return todos.every(todo => todo.done);
        });

        const filteredTodos = computed(() => {
            return getFilters.value[visibility.value](todos);
        });

        const remaining = computed(() => {
            return todos.filter(todo => !todo.done).length;
        });

        const setLocalStorage = () => {
            storage.rcSetItem(StorageType.local, STORAGE_KEY, JSON.stringify(todos));
        };

        const addTodo = (e: KeyboardEvent) => {
            const text = (e.target as HTMLInputElement).value;
            if (text.trim()) {
                todos.push({
                    text,
                    done: false
                });
                setLocalStorage();
            }
            (e as any).target.value = '';
        };

        const toggleTodo = (todo: TodoItem) => {
            todo.done = !todo.done;
            setLocalStorage();
        };

        const deleteTodo = (todo: TodoItem) => {
            todos.splice(todos.indexOf(todo), 1);
            setLocalStorage();
        };

        const editTodo = ({ todo, value }: { todo: TodoItem, value: string }) => {
            todo.text = value;
            setLocalStorage();
        };

        const clearCompleted = () => {
            todos = todos.filter(todo => !todo.done);
            setLocalStorage();
        };

        const toggleAll = ({ done }: { done: boolean }) => {
            todos.forEach(todo => {
                todo.done = done;
                setLocalStorage();
            });
        };

        return {
            visibility,
            todos,
            getFilters,
            pluralize,
            capitalize,
            allChecked,
            filteredTodos,
            remaining,
            addTodo,
            toggleTodo,
            deleteTodo,
            editTodo,
            clearCompleted,
            toggleAll
        };
    }

});
</script>

<style lang="scss" scope>
.todoapp {
    font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-weight: 300;
    line-height: 1.4em;
    position: relative;
    z-index: 1;
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    color: #4d4d4d;
    background: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    button {
        font-family: inherit;
        font-size: 100%;
        font-weight: inherit;
        margin: 0;
        padding: 0;
        vertical-align: baseline;
        color: inherit;
        border: 0;
        background: none;
        -webkit-appearance: none;
        appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    :focus {
        outline: 0;
    }

    .hidden {
        display: none;
    }

    .todoapp {
        position: relative;
        margin: 130px 0 40px 0;
        background: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
    }

    .todoapp input::-webkit-input-placeholder {
        font-weight: 300;
        font-style: italic;
        color: #e6e6e6;
    }

    .todoapp input::-moz-placeholder {
        font-weight: 300;
        font-style: italic;
        color: #e6e6e6;
    }

    .todoapp input::input-placeholder {
        font-weight: 300;
        font-style: italic;
        color: #e6e6e6;
    }

    .todoapp h1 {
        font-size: 100px;
        font-weight: 100;
        position: absolute;
        top: -155px;
        width: 100%;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
        -webkit-text-rendering: optimizeLegibility;
        -moz-text-rendering: optimizeLegibility;
        text-rendering: optimizeLegibility;
    }

    .new-todo,
    .edit {
        font-family: inherit;
        font-size: 18px;
        font-weight: inherit;
        line-height: 1.4em;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        margin: 0;
        padding: 6px;
        color: inherit;
        border: 0;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .new-todo {
        padding: 10px 16px 16px 60px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }

    .main {
        position: relative;
        z-index: 2;
        border-top: 1px solid #e6e6e6;
    }

    .toggle-all {
        position: absolute;
        text-align: center;
        /* Mobile Safari */
        opacity: 0;
        border: none;
    }

    .toggle-all + label {
        font-size: 0;
        position: absolute;
        top: -52px;
        left: -13px;
        width: 60px;
        height: 34px;
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    .toggle-all + label:before {
        font-size: 22px;
        padding: 10px 27px 10px 27px;
        content: "❯";
        color: #e6e6e6;
    }

    .toggle-all:checked + label:before {
        color: #737373;
    }

    .todo-list {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .todo-list li {
        font-size: 24px;
        position: relative;
        border-bottom: 1px solid #ededed;
    }

    .todo-list li:last-child {
        border-bottom: none;
    }

    .todo-list li.editing {
        padding: 0;
        border-bottom: none;
    }

    .todo-list li.editing .edit {
        display: block;
        width: 506px;
        margin: 0 0 0 43px;
        padding: 12px 16px;
    }

    .todo-list li.editing .view {
        display: none;
    }

    .todo-list li .toggle {
        position: absolute;
        top: 0;
        /* auto, since non-WebKit browsers doesn't support input styling */
        bottom: 0;
        width: 40px;
        height: auto;
        margin: auto 0;
        text-align: center;
        border: none;
        /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
    }

    .todo-list li .toggle {
        opacity: 0;
    }

    .todo-list li .toggle + label {
        /*
        Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
        IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
      */
        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center left;
        background-size: 36px;
    }

    .todo-list li .toggle:checked + label {
        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
        background-size: 36px;
    }

    .todo-list li label {
        font-size: 14px;
        line-height: 1.0;
        display: block;
        padding: 15px 15px 15px 50px;
        transition: color 0.4s;
        word-break: break-all;
    }

    .todo-list li.completed label {
        text-decoration: line-through;
        color: #d9d9d9;
    }

    .todo-list li .destroy {
        font-size: 30px;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        display: none;
        width: 40px;
        height: 40px;
        margin: auto 0;
        cursor: pointer;
        transition: color 0.2s ease-out;
        color: #cc9a9a;
    }

    .todo-list li .destroy:hover {
        color: #af5b5e;
    }

    .todo-list li .destroy:after {
        content: "×";
    }

    .todo-list li:hover .destroy {
        display: block;
    }

    .todo-list li .edit {
        display: none;
    }

    .todo-list li.editing:last-child {
        margin-bottom: -1px;
    }

    .footer {
        position: relative;
        height: 40px;
        padding: 10px 15px;
        text-align: center;
        color: #777;
        border-top: 1px solid #e6e6e6;
    }

    .footer:before {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        height: 40px;
        content: "";
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }

    .todo-count {
        float: left;
        text-align: left;
    }

    .todo-count strong {
        font-weight: 300;
    }

    .filters {
        position: relative;
        z-index: 1;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .filters li {
        display: inline;
    }

    .filters li a {
        font-size: 12px;
        padding: 3px 7px;
        text-decoration: none;
        color: inherit;
        border: 1px solid transparent;
        border-radius: 3px;
    }

    .filters li a:hover {
        border-color: rgba(175, 47, 47, 0.1);
    }

    .filters li a.selected {
        border-color: rgba(175, 47, 47, 0.2);
    }

    .clear-completed,
    html .clear-completed:active {
        line-height: 20px;
        position: relative;
        float: right;
        cursor: pointer;
        text-decoration: none;
    }

    .clear-completed:hover {
        text-decoration: underline;
    }

    .info {
        font-size: 10px;
        margin: 65px auto 0;
        text-align: center;
        color: #bfbfbf;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    }

    .info p {
        line-height: 1;
    }

    .info a {
        font-weight: 400;
        text-decoration: none;
        color: inherit;
    }

    .info a:hover {
        text-decoration: underline;
    }

    /*
    Hack to remove background from Mobile Safari.
    Can't use it globally since it destroys checkboxes in Firefox
  */
    @media screen and (-webkit-min-device-pixel-ratio: 0) {
        .toggle-all,
        .todo-list li .toggle {
            background: none;
        }

        .todo-list li .toggle {
            height: 40px;
        }
    }

    @media (max-width: 430px) {
        .footer {
            height: 50px;
        }
    }
}
</style>
