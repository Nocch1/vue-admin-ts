<template>
    <div class="app-container">
        <SwitchRoles @change="handleRolesChange" />
        <div :key="key" style="margin-top:30px;">
            <div>
                <span v-permission="['admin']" class="permission-alert">
                    Only
                    <el-tag class="permission-tag" size="small">admin</el-tag>
                    can see this
                </span>
                <el-tag v-permission="['admin']" class="permission-sourceCode" type="info">
                    v-permission="['admin']"
                </el-tag>
            </div>

            <div>
                <span v-permission="['editor']" class="permission-alert">
                    Only
                    <el-tag class="permission-tag" size="small">editor</el-tag>
                    can see this
                </span>
                <el-tag v-permission="['editor']" class="permission-sourceCode" type="info">
                    v-permission="['editor']"
                </el-tag>
            </div>

            <div>
                <span v-permission="['admin','editor']" class="permission-alert">
                    Both
                    <el-tag class="permission-tag" size="small">admin</el-tag>
                    and
                    <el-tag class="permission-tag" size="small">editor</el-tag>
                    can see this
                </span>
                <el-tag v-permission="['admin','editor']" class="permission-sourceCode" type="info">
                    v-permission="['admin','editor']"
                </el-tag>
            </div>
        </div>

        <div :key="'checkPermission'+key" style="margin-top:60px;">
            <aside>
                {{ t('permission.tips') }}
                <br> e.g.
            </aside>

            <el-tabs style="width:550px;" type="border-card">
                <el-tab-pane v-if="checkPermission(['admin'])" label="Admin">
                    Admin can see this
                    <el-tag class="permission-sourceCode" type="info">
                        v-if="checkPermission(['admin'])"
                    </el-tag>
                </el-tab-pane>

                <el-tab-pane v-if="checkPermission(['editor'])" label="Editor">
                    Editor can see this
                    <el-tag class="permission-sourceCode" type="info">
                        v-if="checkPermission(['editor'])"
                    </el-tag>
                </el-tab-pane>

                <el-tab-pane v-if="checkPermission(['admin','editor'])" label="Admin-OR-Editor">
                    Both admin or editor can see this
                    <el-tag class="permission-sourceCode" type="info">
                        v-if="checkPermission(['admin','editor'])"
                    </el-tag>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import { checkPermission } from '@/utils/permission'; // Use permission directly
import { useI18n } from 'vue-i18n';
import SwitchRoles from './components/SwitchRoles.vue';

export default defineComponent({
    components: {
        SwitchRoles
    },
    setup() {
        const { t } = useI18n();
        const state = reactive({
            key: 1,
            checkPermission: checkPermission,
            handleRolesChange: () => {
                state.key++;
            }
        });

        return {
            t,
            ...toRefs(state)
        };
    }
});
</script>

<style lang="scss" scoped>
.permission-alert {
    display: inline-block;
    width: 320px;
    margin-top: 15px;
    padding: 8px 16px;
    color: #67c23a;
    border-radius: 4px;
    background-color: #f0f9eb;
}

.permission-sourceCode {
    margin-left: 15px;
}

.permission-tag {
    background-color: #ecf5ff;
}
</style>
