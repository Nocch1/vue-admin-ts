<template>
    <el-card class="box-card-component" style="margin-left:8px;">
        <div class="box-card-header">
            <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
        </div>
        <div style="position:relative;">
            <PanThumb :image="avatar" class="panThumb" />
            <Mallki class="mallki-text" text="vue-typescript-admin" />
            <div class="progress-item" style="padding-top:35px;">
                <span>Vue</span>
                <el-progress :percentage="51" />
            </div>
            <div class="progress-item">
                <span>Typescript</span>
                <el-progress :percentage="45" />
            </div>
            <div class="progress-item">
                <span>CSS</span>
                <el-progress :percentage="4" />
            </div>
            <div class="progress-item">
                <span>ESLint</span>
                <el-progress :percentage="100" status="success" />
            </div>
        </div>
    </el-card>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';
import PanThumb from '@/components/pan-thumb/Index.vue';
import Mallki from '@/components/text-hover-effect/Mallki.vue';

export default defineComponent({
    components: {
        PanThumb,
        Mallki
    },
    setup() {
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
            name,
            avatar,
            roles
        };
    }
});
</script>

<style lang="scss">
.box-card-component {
    .el-card__header {
        padding: 0px !important;
    }
}

.panThumb {
    position: absolute !important;
    z-index: 100;
    top: -45px;
    left: 0px;
    width: 70px !important;
    height: 70px !important;
    margin: auto;
    border: 5px solid #ffffff;
    background-color: #fff;
    box-shadow: none !important;

    .pan-info {
        box-shadow: none !important;
    }
}
</style>

<style lang="scss" scoped>
.box-card-component {
    .box-card-header {
        position: relative;
        height: 220px;

        img {
            width: 100%;
            height: 100%;
            transition: all 0.2s linear;

            &:hover {
                transform: scale(1.1, 1.1);
                filter: contrast(130%);
            }
        }
    }

    .mallki-text {
        font-size: 20px;
        font-weight: bold;
        position: absolute;
        top: 0px;
        right: 0px;
    }

    .progress-item {
        font-size: 14px;
        margin-bottom: 10px;
    }

    @media only screen and (max-width: 1510px) {
        .mallki-text {
            display: none;
        }
    }
}
</style>
