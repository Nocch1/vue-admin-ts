/* eslint-disable vue/no-mutating-props */
<template>
    <div :class="computedClasses()" class="material-input__component">
        <div :class="{iconClass: icon}">
            <i v-if="icon" :class="['el-icon-' + icon]" class="el-input__icon material-input__icon" />
            <input v-if="type === 'email'" :id="id" v-model="valueCopy" :autocomplete="autoComplete" :disabled="disabled" :name="name"
                   :placeholder="filledPlaceholder" :readonly="readonly" :required="required" class="material-input" type="email" @blur="handleBlur"
                   @focus="handleFocus" @input="handleInput">
            <input v-if="type === 'url'" :id="id" v-model="valueCopy" :autocomplete="autoComplete" :disabled="disabled" :name="name"
                   :placeholder="filledPlaceholder" :readonly="readonly" :required="required" class="material-input" type="url" @blur="handleBlur"
                   @focus="handleFocus" @input="handleInput">
            <input v-if="type === 'number'" :id="id" v-model="valueCopy" :autocomplete="autoComplete" :disabled="disabled" :max="max"
                   :maxlength="maxlength" :min="min" :minlength="minlength" :name="name" :placeholder="filledPlaceholder" :readonly="readonly"
                   :required="required" :step="step" class="material-input" type="number" @blur="handleBlur" @focus="handleFocus"
                   @input="handleInput">
            <input v-if="type === 'password'" :id="id" v-model="valueCopy" :autocomplete="autoComplete" :disabled="disabled" :max="max" :min="min"
                   :name="name" :placeholder="filledPlaceholder" :readonly="readonly" :required="required" :step="step" class="material-input"
                   type="password" @blur="handleBlur" @focus="handleFocus" @input="handleInput">
            <input v-if="type === 'tel'" :id="id" v-model="valueCopy" :autocomplete="autoComplete" :disabled="disabled" :name="name"
                   :placeholder="filledPlaceholder" :readonly="readonly" :required="required" class="material-input" type="tel" @blur="handleBlur"
                   @focus="handleFocus" @input="handleInput">
            <input v-if="type === 'text'" :id="id" :autocomplete="autoComplete"

                   :disabled="disabled" :maxlength="maxlength" :minlength="minlength" :name="name" :placeholder="filledPlaceholder()"
                   :readonly="readonly" :required="required" :value="title" class="material-input" type="text" @blur="handleBlur" @focus="handleFocus"
                   @input="handleInput">
            <span class="material-input-bar" />
            <label class="material-label">
                <slot />
            </label>
        </div>
    </div>
</template>

<script lang="ts">
// Source: https://github.com/wemake-services/vue-material-input/blob/master/src/components/MaterialInput.vue
import { defineComponent, getCurrentInstance, reactive, toRefs } from 'vue';

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: 'text'
        },
        id: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: true
        },
        autoComplete: {
            type: String,
            default: 'off'
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 10000
        },
        step: {
            type: Number,
            default: 1
        },
        minlength: {
            type: Number,
            default: 0
        },
        maxlength: {
            type: Number,
            default: 20
        },
        validateEvent: {
            type: Boolean,
            default: true
        }
    },
    emits: ['inputVal', 'el.form.change', 'focus', 'blur'],
    setup(props, contex) {
        console.log(props.title, 'propspropspropspropsprops');
        const state = reactive({
            focus: false
        });
        const { ctx } = getCurrentInstance() as any;
        // watch(() => state.valueCopy, (value) => {
        //   state.valueCopy = value
        // })

        const computedClasses = () => {
            return {
                'material--active': state.focus,
                'material--disabled': props.disabled
                // 'material--raised': Boolean(state.focus || state.valueCopy)
            };
        };

        const filledPlaceholder = () => {
            if (state.focus) {
                return props.placeholder;
            }
            return '';
        };
        const handleInput = (event: KeyboardEvent) => {
            const value = (event.target as HTMLInputElement).value;
            contex.emit('inputVal', value);
            if (ctx.$parent.$options.name === 'ElFormItem') {
                if (props.validateEvent) {
                    // See https://github.com/ElemeFE/element/blob/dev/packages/form/src/form-item.vue#L293
                    // eslint-disable-next-line vue/custom-event-name-casing
                    contex.emit('el.form.change', [value]);
                }
            }
        };

        const handleFocus = (event: FocusEvent) => {
            state.focus = true;
            contex.emit('focus', event);
        };

        const handleBlur = (event: FocusEvent) => {
            state.focus = false;
            contex.emit('blur', event);
            if (ctx.$parent.$options.name === 'ElFormItem') {
                if (props.validateEvent) {
                    // See https://github.com/ElemeFE/element/blob/dev/packages/form/src/form-item.vue#L292
                    // eslint-disable-next-line vue/custom-event-name-casing
                    // ctx.$parent.$emit('el.form.blur', [state.valueCopy])
                }
            }
        };
        return {
            ...toRefs(state),
            computedClasses,
            filledPlaceholder,
            handleInput,
            handleFocus,
            handleBlur
        };
    }
});
</script>

<style lang="scss" scoped>
// Fonts:
$font-size-base: 16px;
$font-size-small: 14px;
$font-size-smallest: 12px;
$font-weight-normal: normal;
$font-weight-bold: bold;

// Utils
$spacer: 10px;
$transition: 0.2s ease all;
$index-has-icon: 30px;

// Theme:
$color-white: white;
$color-grey: #9E9E9E;
$color-grey-light: #E0E0E0;
$color-blue: #2196F3;
$color-red: #F44336;
$color-black: black;

// Base clases:
%base-bar-pseudo {
    position: absolute;
    bottom: 0;
    width: 0;
    height: 1px;
    content: "";
    transition: $transition;
}

// Mixins:
@mixin slided-top() {
    top: - ($font-size-base + $spacer);
    left: 0;
    font-size: $font-size-base;
    font-weight: $font-weight-bold;
}

// Component:
.material-input__component {
    position: relative;
    margin-top: 45px;

    * {
        box-sizing: border-box;
    }

    .iconClass {
        .material-input__icon {
            font-size: $font-size-base;
            font-weight: $font-weight-normal;
            line-height: $font-size-base;
            position: absolute;
            top: $spacer;
            left: 0;
            width: $index-has-icon;
            height: $font-size-base;
            pointer-events: none;
            color: $color-blue;
        }

        .material-label {
            left: $index-has-icon;
        }

        .material-input {
            text-indent: $index-has-icon;
        }
    }

    .material-input {
        font-size: $font-size-base;
        display: block;
        width: 100%;
        padding: $spacer $spacer $spacer $spacer / 2;
        border: none;
        border-radius: 0;

        &:focus {
            border: none;
            border-bottom: 1px solid transparent; // fixes the height issue
            outline: none;
        }
    }

    .material-label {
        font-size: $font-size-small;
        font-weight: $font-weight-normal;
        position: absolute;
        top: 0;
        left: 0;
        transition: $transition;
        pointer-events: none;
    }

    .material-input-bar {
        position: relative;
        display: block;
        width: 100%;

        &:before {
            @extend %base-bar-pseudo;
            left: 50%;
        }

        &:after {
            @extend %base-bar-pseudo;
            right: 50%;
        }
    }

    // Disabled state:
    &.material--disabled {
        .material-input {
            border-bottom-style: dashed;
        }
    }

    // Raised state:
    &.material--raised {
        .material-label {
            @include slided-top();
        }
    }

    // Active state:
    &.material--active {
        .material-input-bar {
            &:before,
            &:after {
                width: 50%;
            }
        }
    }

    // Errors:
    .material-errors {
        position: relative;
        overflow: hidden;

        .material-error {
            font-size: $font-size-smallest;
            line-height: $font-size-smallest + 2px;
            overflow: hidden;
            margin-top: 0;
            padding-top: $spacer / 2;
            padding-right: $spacer / 2;
            padding-left: 0;
        }
    }
}

.material-input__component {
    background: $color-white;

    .material-input {
        color: $color-black;
        border-bottom: 1px solid $color-grey-light;
        background: none;
    }

    .material-label {
        color: $color-grey;
    }

    .material-input-bar {
        &:before,
        &:after {
            background: $color-blue;
        }
    }

    // Active state:
    &.material--active {
        .material-label {
            color: $color-blue;
        }
    }
}
</style>
