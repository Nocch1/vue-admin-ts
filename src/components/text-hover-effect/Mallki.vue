<template>
    <a :class="className" class="link--mallki" href="#">
        {{ text }}
        <span :data-letters="text" />
        <span :data-letters="text" />
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        className: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: 'vue3-compisition-admin'
        }
    }
});
</script>

<style lang="scss" scoped>
/* Mallki */

.link--mallki {
    font-family: "Dosis", sans-serif;
    font-weight: 800;
    line-height: 1;
    position: relative;
    display: inline-block;
    overflow: hidden;
    -webkit-transition: color 0.5s 0.25s;
    transition: color 0.5s 0.25s;
    text-decoration: none;
    color: #4dd9d5;
    outline: none;

    &:hover {
        -webkit-transition: none;
        transition: none;
        color: transparent;

        &::before {
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }
    }

    &::before {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 6px;
        margin: -3px 0 0 0;
        content: "";
        -webkit-transition: -webkit-transform 0.4s;
        transition: transform 0.4s;
        -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        -webkit-transform: translate3d(-100%, 0, 0);
        transform: translate3d(-100%, 0, 0);
        background: #3888fa;
    }

    span {
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        width: 100%;
        height: 50%;

        &::before {
            position: absolute;
            left: 0;
            width: 100%;
            content: attr(data-letters);
            -webkit-transition: -webkit-transform 0.5s;
            transition: transform 0.5s;
            color: red;
            color: #3888fa;
        }

        &:nth-child(2) {
            top: 50%;
        }

        &:first-child::before {
            top: 0;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
        }

        &:nth-child(2)::before {
            bottom: 0;
            -webkit-transform: translate3d(0, -100%, 0);
            transform: translate3d(0, -100%, 0);
        }
    }
}

.link--mallki:hover span::before {
    -webkit-transition-delay: 0.3s;
    transition-delay: 0.3s;
    -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}
</style>
