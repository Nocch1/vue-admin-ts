<template>
    <a v-if="isExternal(to)" :href="to" rel="noopener" target="_blank">
        <slot />
    </a>
    <div v-else @click="push">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { isExternal } from '@/utils/validate';
import { useRouter } from 'vue-router';

export default defineComponent({
    props: {
        to: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const router = useRouter();
        const push = () => {
            console.log(props.to);
            router.push(props.to).catch((err) => {
                console.log(err);
            });
        };
        return {
            push,
            isExternal
        };
    }
});
</script>
