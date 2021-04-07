<template>
    <div class="components-container">
        <aside>
            <a href="https://github.com/PanJiaChen/vue-countTo" target="_blank">
                countTo-component
            </a>
        </aside>
        <CountTo ref="count" :autoplay="false" :decimals="decimals" :duration="duration" :end-val="endVal" :prefix="prefix" :separator="separator"
                 :start-val="startVal" :suffix="suffix" class="count" />
        <div style="margin-left: 25%; margin-top: 40px;">
            <label class="label" for="startValInput">
                startVal:
                <input v-model.number="setStartVal" name="startValInput" type="number">
            </label>
            <label class="label" for="endValInput">
                endVal:
                <input v-model.number="setEndVal" name="endVaInput" type="number">
            </label>
            <label class="label" for="durationInput">
                duration:
                <input v-model.number="setDuration" name="durationInput" type="number">
            </label>
            <div class="startBtn count-btn" @click="startCount">
                Start
            </div>
            <div class="pause-resume-btn count-btn" @click="pauseResume">
                pause/resume
            </div>
            <br>
            <label class="label" for="decimalsInput">
                decimals:
                <input v-model.number="setDecimals" name="decimalsInput" type="number">
            </label>
            <label class="label" for="separatorInput">
                separator:
                <input v-model="setSeparator" name="separatorInput">
            </label>
            <label class="label" for="prefixInput">
                prefix:
                <input v-model="setPrefix" name="prefixInput">
            </label>
            <label class="label" for="suffixInput">
                suffix:
                <input v-model="setSuffix" name="suffixInput">
            </label>
        </div>
        <aside>
            &lt;count-to :start-val=&#x27;{{ startVal }}&#x27; :end-val=&#x27;{{ endVal }}&#x27; :duration=&#x27;{{ duration }}&#x27; :decimals=&#x27;{{
                decimals
            }}&#x27; :separator=&#x27;{{ separator }}&#x27; :prefix=&#x27;{{ prefix }}&#x27; :suffix=&#x27;{{ suffix }}&#x27; :autoplay=false&gt;
        </aside>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, reactive, ref, toRefs } from 'vue';
import { CountTo } from 'vue3-count-to';

export default defineComponent({
    components: {
        CountTo
    },
    setup() {
        const { ctx } = getCurrentInstance() as any;
        const state = reactive({
            setStartVal: 0,
            setEndVal: 2017,
            setDuration: 4000,
            setDecimals: 0,
            setSeparator: '',
            setSuffix: ' rmb',
            setPrefix: '¥ '
        });
        const stateAsRefs = toRefs(state);
        const startVal = computed(() => {
            if (state.setStartVal) {
                return state.setStartVal;
            } else {
                return 0;
            }
        });
        const endVal = computed(() => {
            if (state.setEndVal) {
                return state.setEndVal;
            } else {
                return 0;
            }
        });
        const duration = computed(() => {
            if (state.setDuration) {
                return state.setDuration;
            } else {
                return 0;
            }
        });
        const decimals = computed(() => {
            if (state.setDecimals) {
                if (state.setDecimals < 0 || state.setDecimals > 20) {
                    alert('digits argument must be between 0 and 20');
                    return 0;
                }
                return state.setDecimals;
            } else {
                return 0;
            }
        });
        const separator = computed(() => {
            return state.setSeparator;
        });
        const suffix = computed(() => {
            return state.setSuffix;
        });
        const prefix = computed(() => {
            return state.setPrefix;
        });
        const countRef = ref(null);
        const startCount = () => {
            console.log(ctx.$refs);
            // ctx.$refs.count && (ctx.$refs.count as any).start()
        };
        const pauseResume = () => {
            // countRef.value && (countRef.value as any).pauseResume()
        };
        return {
            startVal,
            endVal,
            duration,
            decimals,
            separator,
            suffix,
            prefix,
            countRef,
            startCount,
            pauseResume,
            ...state,
            ...stateAsRefs
        };
    }
});
</script>

<style lang="scss" scoped>
.count {
    font-size: 50px;
    font-size: 80px;
    font-weight: 500;
    display: block;
    margin: 10px 0;
    text-align: center;
    color: #f6416c;
}

.count-btn {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    position: relative;
    display: inline-block;
    margin: 10px 0;
    padding: 2px 15px;
    cursor: pointer;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    text-align: center;
    white-space: nowrap;
    color: rgba(0, 0, 0, 0.65);
    border: 1px solid transparent;
    border-color: #d9d9d9;
    border-radius: 4px;
    background-color: #fff;
    background-image: none;
    -ms-touch-action: manipulation;
    touch-action: manipulation;

    &:hover {
        color: #4ab7bd;
        border-color: #4ab7bd;
        background-color: #fff;
    }
}

.label {
    font-size: 16px;
    display: inline-block;
    margin: 15px 30px 15px 0;
    color: #2f4f4f;
}

input {
    font-size: 12px;
    line-height: 1.5;
    position: relative;
    display: inline-block;
    width: 70px;
    height: 28px;
    padding: 4px 7px;
    cursor: text;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    color: rgba(0, 0, 0, 0.65);
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    background-color: #fff;
    background-image: none;
}

.startBtn {
    font-size: 20px;
    margin-right: 10px;
    color: #30b08f;
    background-color: #fff;

    &:hover {
        color: #fff;
        border-color: #30b08f;
        background-color: #30b08f;
    }
}

.pause-resume-btn {
    font-size: 20px;
    color: #e65d6e;
    background-color: #fff;

    &:hover {
        color: #fff;
        border-color: #e65d6e;
        background-color: #e65d6e;
    }
}
</style>
