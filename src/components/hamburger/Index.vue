<template>
    <div :class="[{'is-active': isActive}]" @click="toggleClick">
        <svg aria-hidden="true" class="icon" font-size="20px">
            <use xlink:href="#iconhamburger" />
        </svg>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },
    emits: ['toggle-click'],
    setup(_, context) {
        const toggleClick = () => {
            context.emit('toggle-click');
        };
        return {
            toggleClick
        };
    }
});
</script>

<style lang="scss" scoped>
.icon {
    vertical-align: middle;
}

.is-active {
    transform: rotate(180deg);
}
</style>
