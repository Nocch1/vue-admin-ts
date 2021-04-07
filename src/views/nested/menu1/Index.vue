<template>
    <div style="padding:30px;">
        <el-alert :closable="false" title="menu 1">
            <transition mode="out-in" name="fade-transform">
                <router-view />
            </transition>
        </el-alert>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
