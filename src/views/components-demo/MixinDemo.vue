<template>
    <div class="mixin-components-container">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card">
                    <template #header>
                        <div class="clearfix">
                            <span>Buttons</span>
                        </div>
                    </template>
                    <div style="margin-bottom:50px;">
                        <el-row :span="24">
                            <el-col :span="4" class="text-center">
                                <router-link class="pan-btn blue-btn" to="/documentation/index">
                                    Documentation
                                </router-link>
                            </el-col>
                            <el-col :span="4" class="text-center">
                                <router-link class="pan-btn light-blue-btn" to="/icon/index">
                                    Icons
                                </router-link>
                            </el-col>
                            <el-col :span="4" class="text-center">
                                <router-link class="pan-btn pink-btn" to="/excel/export-excel">
                                    Excel
                                </router-link>
                            </el-col>
                            <el-col :span="4" class="text-center">
                                <router-link class="pan-btn green-btn" to="/table/complex-table">
                                    Table
                                </router-link>
                            </el-col>
                            <el-col :span="4" class="text-center">
                                <router-link class="pan-btn tiffany-btn" to="/example/create">
                                    Form
                                </router-link>
                            </el-col>
                            <el-col :span="4" class="text-center">
                                <router-link class="pan-btn yellow-btn" to="/theme/index">
                                    Theme
                                </router-link>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:50px;">
            <el-col :span="6">
                <el-card class="box-card">
                    <template #header>
                        <div class="clearfix">
                            <span>Material Design 的input</span>
                        </div>
                    </template>
                    <div style="height:100px;">
                        <el-form :model="demo" :rules="demoRules">
                            <el-form-item prop="title">
                                <MaterialInput id="material-input-demo" v-model="demo.title" icon="el-icon-search" name="title" placeholder="输入标题">
                                    标题
                                </materialinput>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                    <template #header>
                        <div class="clearfix">
                            <span>图片hover效果</span>
                        </div>
                    </template>
                    <div class="component-item">
                        <PanThumb height="100px" image="https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191" width="100px">
                            vue-typescript-admin
                        </PanThumb>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                    <template #header>
                        <div class="clearfix">
                            <span>水波纹 waves v-directive</span>
                        </div>
                    </template>
                    <div class="component-item">
                        <el-button v-waves type="primary">
                            水波纹效果
                        </el-button>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card">
                    <template #header>
                        <div class="clearfix">
                            <span>hover text</span>
                        </div>
                    </template>
                    <div class="component-item">
                        <Mallki class-name="mallki-text" text="vue-typescript-admin" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:50px;">
            <el-col :span="8">
                <el-card class="box-card">
                    <template #header>
                        <div class="clearfix">
                            <span>Share</span>
                        </div>
                    </template>
                    <div class="component-item" style="height:420px;">
                        <DropdownMenu :items="articleList" style="margin:0 auto;" title="系列文章" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MaterialInput from '@/components/material-input/Index.vue';
import PanThumb from '@/components/pan-thumb/Index.vue';
import Mallki from '@/components/text-hover-effect/Mallki.vue';
import DropdownMenu from '@/components/dropdown-menu/Index.vue';

export default defineComponent({
    components: {
        MaterialInput, PanThumb, Mallki, DropdownMenu
    },
    setup() {
        const validateLength = (rule: any, value: string, callback: Function) => {
            if (value.length !== 6) {
                callback(new Error('请输入六个字符'));
            } else {
                callback();
            }
        };
        const demo = {
            title: ''
        };
        const demoRules = {
            title: [{ validator: validateLength, trigger: 'change' }]
        };
        const articleList = [
            { title: '基础篇', href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2' },
            { title: '登录权限篇', href: 'https://juejin.im/post/591aa14f570c35006961acac' },
            { title: '实战篇', href: 'https://juejin.im/post/593121aa0ce4630057f70d35' },
            { title: 'vue-admin-template 篇', href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56' },
            { title: 'v4.0 篇', href: 'https://juejin.im/post/5c92ff94f265da6128275a85' },
            { title: '优雅的使用 icon', href: 'https://juejin.im/post/59bb864b5188257e7a427c09' }
        ];
        return {
            validateLength, demo, demoRules, articleList
        };
    }
});
</script>

<style lang="scss">
@mixin colorBtn($color) {
    background: $color;
    &:hover {
        color: $color;

        &:before,
        &:after {
            background: $color;
        }
    }
}

.blue-btn {
    @include colorBtn($blue)
}

.light-blue-btn {
    @include colorBtn($light-blue)
}

.red-btn {
    @include colorBtn($red)
}

.pink-btn {
    @include colorBtn($pink)
}

.green-btn {
    @include colorBtn($green)
}

.tiffany-btn {
    @include colorBtn($tiffany)
}

.yellow-btn {
    @include colorBtn($yellow)
}

.pan-btn {
    font-size: 14px;
    position: relative;
    display: inline-block;
    padding: 14px 36px;
    transition: 600ms ease all;
    color: #fff;
    border: none;
    border-radius: 8px;
    outline: none;

    &:hover {
        background: #fff;

        &:before,
        &:after {
            width: 100%;
            transition: 600ms ease all;
        }
    }

    &:before,
    &:after {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 2px;
        content: "";
        transition: 400ms ease all;
    }

    &::after {
        top: inherit;
        right: inherit;
        bottom: 0;
        left: 0;
    }
}

.mixin-components-container {
    min-height: calc(100vh - 84px);
    padding: 30px;
    background-color: #f0f2f5;
}

.component-item {
    min-height: 100px;
}
</style>
