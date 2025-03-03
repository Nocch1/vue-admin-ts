<template>
    <div class="app-container">
        <el-card class="box-card">
            <template #header>
                <a class="link-type link-title" href="https://armour.github.io/vue-typescript-admin-docs/guide/advanced/theme.html" target="_blank">
                    {{ t('theme.documentation') }}
                </a>
            </template>
            <div class="box-item">
                <span class="field-label">{{ t('theme.change') }} : </span>
                <el-switch v-model="theme" />
                <aside style="margin-top:15px;">
                    {{ t('theme.tips') }}
                </aside>
            </div>
        </el-card>

        <div class="block">
            <el-button type="primary">
                Primary
            </el-button>
            <el-button type="success">
                Success
            </el-button>
            <el-button type="info">
                Info
            </el-button>
            <el-button type="warning">
                Warning
            </el-button>
            <el-button type="danger">
                Danger
            </el-button>
        </div>

        <div class="block">
            <el-button icon="el-icon-edit" type="primary" />
            <el-button icon="el-icon-share" type="primary" />
            <el-button icon="el-icon-delete" type="primary" />
            <el-button icon="el-icon-search" type="primary">
                Search
            </el-button>
            <el-button type="primary">
                Upload
                <i class="el-icon-upload el-icon-right" />
            </el-button>
        </div>

        <div class="block">
            <el-tag v-for="tag in tags" :key="tag.type" :type="tag.type" class="tag-item">
                {{ tag.name }}
            </el-tag>
        </div>

        <div class="block">
            <el-radio-group v-model="radio">
                <el-radio :label="3">
                    Option A
                </el-radio>
                <el-radio :label="6">
                    Option B
                </el-radio>
                <el-radio :label="9">
                    Option C
                </el-radio>
            </el-radio-group>
        </div>

        <div class="block">
            <el-slider v-model="slideValue" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';
import { toggleClass } from '@/utils';
import '@/assets/custom-theme/index.css'; // the theme changed version element-ui css
import { useI18n } from 'vue-i18n';

export default defineComponent({
    setup() {
        const { t } = useI18n();
        const dataMap = reactive({
            tags: [
                { name: 'Tag One', type: '' },
                { name: 'Tag Two', type: 'info' },
                { name: 'Tag Three', type: 'success' },
                { name: 'Tag Four', type: 'warning' },
                { name: 'Tag Five', type: 'danger' }
            ],
            theme: false,
            slideValue: 50,
            radio: 3
        });

        watch(() => dataMap.theme, () => {
            toggleClass(document.body, 'custom-theme');
        });

        return { t, ...toRefs(dataMap) };
    }
});
</script>

<style lang="scss" scoped>
.field-label {
    vertical-align: middle;
}

.box-card {
    width: 400px;
    max-width: 100%;
    margin: 20px auto;
}

.block {
    padding: 30px 24px;
}

.tag-item {
    margin-right: 15px;
}
</style>
