<template>
    <div :style="{zIndex: zIndex, height: height, width: width}" class="pan-item">
        <div class="pan-info">
            <div class="pan-info-roles-container">
                <slot />
            </div>
        </div>
        <div :style="{backgroundImage: `url(${image})`}" class="pan-thumb" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PanThumb',
    props: {
        image: {
            type: String,
            required: true
        },
        width: {
            type: String,
            required: true,
            default: '150px'
        },
        height: {
            type: String,
            required: true,
            default: '150px'
        },
        zIndex: {
            type: Number,
            default: 1
        }
    }
});
</script>

<style lang="scss" scoped>
.pan-item {
    position: relative;
    display: inline-block;
    width: 200px;
    height: 200px;
    cursor: default;
    border-radius: 50%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

    &:hover .pan-thumb {
        transform: rotate(-110deg);
    }

    &:hover .pan-info p a {
        transform: translateX(0px) rotate(0deg);
        opacity: 1;
    }
}

.pan-info {
    position: absolute;
    overflow: hidden;
    width: inherit;
    height: inherit;
    border-radius: 50%;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);

    .pan-info-roles-container {
        padding: 20px;
        text-align: center;
    }

    h3 {
        font-family: "Open Sans", Arial, sans-serif;
        font-size: 18px;
        position: relative;
        height: 85px;
        margin: 0 60px;
        padding: 22px 0 0 0;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: #fff;
        text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    p {
        font-size: 12px;
        font-style: italic;
        margin: 0 30px;
        padding: 10px 5px;
        color: #fff;
        border-top: 1px solid rgba(255, 255, 255, 0.5);

        a {
            font-family: "Open Sans", Arial, sans-serif;
            font-size: 9px;
            font-weight: 700;
            font-style: normal;
            display: block;
            width: 80px;
            height: 80px;
            margin: 7px auto 0;
            padding-top: 24px;
            transition: transform 0.3s ease-in-out 0.2s, opacity 0.3s ease-in-out 0.2s, background 0.2s linear 0s;
            transform: translateX(60px) rotate(90deg);
            letter-spacing: 1px;
            text-transform: uppercase;
            opacity: 0;
            color: #333;
            color: #fff;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);

            &:hover {
                background: rgba(255, 255, 255, 0.5);
            }
        }
    }
}

.pan-thumb {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease-in-out;
    transform-origin: 95% 40%;
    border-radius: 50%;
    background-position: center center;
    background-size: cover;
}
</style>
