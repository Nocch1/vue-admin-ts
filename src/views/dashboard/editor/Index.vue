<template>
    <div class="dashboard-editor-container">
        <div class="clearfix">
            <PanThumb :image="avatar" style="float: left">
                Your roles:
                <span v-for="item in roles" :key="item" class="info-roles">{{ item }}</span>
            </PanThumb>
            <GithubCorner style="position: absolute; top: 0px; border: 0; right: 0;" />
            <div class="info-container">
                <span class="display_name">{{ name }}</span>
                <span style="font-size:20px;padding-top:20px;display:inline-block;">Editor's Dashboard</span>
            </div>
        </div>
        <div>
            <img :src="emptyGif" class="emptyGif">
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import PanThumb from '@/components/pan-thumb/Index.vue';
import GithubCorner from '@/components/github-corner/Index.vue';
import { useStore } from '@/store';

export default defineComponent({
    components: {
        PanThumb,
        GithubCorner
    },
    setup() {
        const emptyGif = 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3';
        const store = useStore();
        const name = computed(() => {
            return store.state.user.name;
        });
        const avatar = computed(() => {
            return store.state.user.avatar;
        });
        const roles = computed(() => {
            return store.state.user.roles;
        });

        return {
            emptyGif,
            name,
            avatar,
            roles
        };
    }
});
</script>

<style lang="scss" scoped>
.emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
}

.dashboard-editor-container {
    min-height: 100vh;
    padding: 50px 60px 0px;
    background-color: #e3e3e3;

    .info-roles {
        font-size: 12px;
        font-weight: 700;
        display: block;
        color: #333;
    }

    .info-container {
        line-height: 200px;
        position: relative;
        height: 150px;
        margin-left: 190px;

        .display_name {
            font-size: 48px;
            line-height: 48px;
            position: absolute;
            top: 25px;
            color: #212121;
        }
    }
}
</style>
