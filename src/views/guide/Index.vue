<template>
    <div class="app-container">
        <aside>
            {{ t('guide.description') }}
            <a href="https://github.com/kamranahmedse/driver.js" target="_blank">driver.js.</a>
        </aside>
        <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">
            {{ t('guide.button') }}
        </el-button>
    </div>
</template>

<script lang="ts">
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';
import steps from './steps';
import { defineComponent, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
    setup() {
        const { t } = useI18n();
        let driver: Driver | null = null;
        onMounted(() => {
            driver = new Driver();
        });

        const guide = () => {
            if (driver) {
                driver.defineSteps(steps);
                driver.start();
            }
        };

        return {
            t,
            guide
        };
    }
});

</script>
