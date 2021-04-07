<template>
    <el-row :gutter="40" class="panel-group">
        <el-col :lg="6" :sm="12" :xs="12" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
                <div class="card-panel-icon-wrapper icon-people">
                    <svg aria-hidden="true" class="icon" font-size="50px">
                        <use xlink:href="#iconpeoples" />
                    </svg>
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        New Visits
                    </div>
                    <CountTo ref="myCount" :duration="2600" :end-val="102400" :start-val="0" class="card-panel-num" />
                </div>
            </div>
        </el-col>
        <el-col :lg="6" :sm="12" :xs="12" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('messages')">
                <div class="card-panel-icon-wrapper icon-message">
                    <svg aria-hidden="true" class="icon" font-size="50px">
                        <use xlink:href="#iconmessage" />
                    </svg>
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        Messages
                    </div>
                    <CountTo :duration="3000" :end-val="81212" :start-val="0" class="card-panel-num" />
                </div>
            </div>
        </el-col>
        <el-col :lg="6" :sm="12" :xs="12" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('purchases')">
                <div class="card-panel-icon-wrapper icon-money">
                    <svg aria-hidden="true" class="icon" font-size="50px">
                        <use xlink:href="#iconrmb" />
                    </svg>
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        Purchases
                    </div>
                    <CountTo :duration="3200" :end-val="9280" :start-val="0" class="card-panel-num" />
                </div>
            </div>
        </el-col>
        <el-col :lg="6" :sm="12" :xs="12" class="card-panel-col">
            <div class="card-panel" @click="handleSetLineChartData('shoppings')">
                <div class="card-panel-icon-wrapper icon-shopping">
                    <svg aria-hidden="true" class="icon" font-size="50px">
                        <use xlink:href="#iconshopping" />
                    </svg>
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">
                        Shoppings
                    </div>
                    <CountTo :duration="3600" :end-val="13600" :start-val="0" class="card-panel-num" />
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { CountTo } from 'vue3-count-to';

export default defineComponent({
    components: {
        CountTo
    },
    emits: ['handle-set-line-chart-data'],
    setup(_, { emit }) {
        const handleSetLineChartData = (type: string) => {
            emit('handle-set-line-chart-data', type);
        };

        const myCount = ref(null);
        onMounted(() => {
            console.log((myCount.value as any).value);
        });

        return {
            handleSetLineChartData,
            myCount
        };
    }
});
</script>

<style lang="scss" scoped>
.panel-group {
    margin-top: 18px;

    .card-panel-col {
        margin-bottom: 32px;
    }

    .card-panel {
        font-size: 12px;
        position: relative;
        overflow: hidden;
        height: 108px;
        cursor: pointer;
        color: #666;
        border-color: rgba(0, 0, 0, .05);
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);

        &:hover {
            .card-panel-icon-wrapper {
                color: #fff;
            }

            .icon-people {
                background: #40c9c6;
            }

            .icon-message {
                background: #36a3f7;
            }

            .icon-money {
                background: #f4516c;
            }

            .icon-shopping {
                background: #34bfa3
            }
        }

        .icon-people {
            color: #40c9c6;
        }

        .icon-message {
            color: #36a3f7;
        }

        .icon-money {
            color: #f4516c;
        }

        .icon-shopping {
            color: #34bfa3
        }

        .card-panel-icon-wrapper {
            float: left;
            margin: 14px 0 0 14px;
            padding: 16px;
            transition: all 0.38s ease-out;
            border-radius: 6px;
        }

        .card-panel-icon {
            font-size: 48px;
            float: left;
        }

        .card-panel-description {
            font-weight: bold;
            float: right;
            margin: 26px;
            margin-left: 0px;

            .card-panel-text {
                font-size: 16px;
                line-height: 18px;
                margin-bottom: 12px;
                color: rgba(0, 0, 0, 0.45);
            }

            .card-panel-num {
                font-size: 20px;
            }
        }
    }
}

@media (max-width: 550px) {
    .card-panel-description {
        display: none;
    }

    .card-panel-icon-wrapper {
        float: none !important;
        width: 100%;
        height: 100%;
        margin: 0 !important;

        svg {
            display: block;
            float: none !important;
            margin: 14px auto !important;
        }
    }
}
</style>
