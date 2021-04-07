<template>
    <div class="wscn-http404-container">
        <div class="wscn-http404">
            <div class="pic-404">
                <img alt="404" class="pic-404__parent" src="@/assets/404-images/404.png">
                <img alt="404" class="pic-404__child left" src="@/assets/404-images/404-cloud.png">
                <img alt="404" class="pic-404__child mid" src="@/assets/404-images/404-cloud.png">
                <img alt="404" class="pic-404__child right" src="@/assets/404-images/404-cloud.png">
            </div>
            <div class="text-404">
                <div class="text-404__oops">
                    OOPS!
                </div>
                <div class="text-404__info">
                    All rights reserved
                    <a href="https://wallstreetcn.com" style="color:#20a0ff" target="_blank">wallstreetcn</a>
                </div>
                <div class="text-404__headline">
                    {{ message }}
                </div>
                <div class="text-404__info">
                    Please check that the URL you entered is correct, or click the button below to return to the homepage.
                </div>
                <a class="text-404__return-home" href="">Back to home</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        return {
            message: '404 Page Not Found'
        };
    }
});
</script>

<style lang="scss" scoped>
.wscn-http404-container {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.wscn-http404 {
    position: relative;
    overflow: hidden;
    width: 1200px;
    padding: 0 50px;

    .pic-404 {
        position: relative;
        float: left;
        overflow: hidden;
        width: 600px;

        &__parent {
            width: 100%;
        }

        &__child {
            position: absolute;

            &.left {
                top: 17px;
                left: 220px;
                width: 80px;
                animation-name: cloudLeft;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-delay: 1s;
                opacity: 0;
                animation-fill-mode: forwards;
            }

            &.mid {
                top: 10px;
                left: 420px;
                width: 46px;
                animation-name: cloudMid;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-delay: 1.2s;
                opacity: 0;
                animation-fill-mode: forwards;
            }

            &.right {
                top: 100px;
                left: 500px;
                width: 62px;
                animation-name: cloudRight;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-delay: 1s;
                opacity: 0;
                animation-fill-mode: forwards;
            }

            @keyframes cloudLeft {
                0% {
                    top: 17px;
                    left: 220px;
                    opacity: 0;
                }

                20% {
                    top: 33px;
                    left: 188px;
                    opacity: 1;
                }

                80% {
                    top: 81px;
                    left: 92px;
                    opacity: 1;
                }

                100% {
                    top: 97px;
                    left: 60px;
                    opacity: 0;
                }
            }

            @keyframes cloudMid {
                0% {
                    top: 10px;
                    left: 420px;
                    opacity: 0;
                }

                20% {
                    top: 40px;
                    left: 360px;
                    opacity: 1;
                }

                70% {
                    top: 130px;
                    left: 180px;
                    opacity: 1;
                }

                100% {
                    top: 160px;
                    left: 120px;
                    opacity: 0;
                }
            }

            @keyframes cloudRight {
                0% {
                    top: 100px;
                    left: 500px;
                    opacity: 0;
                }

                20% {
                    top: 120px;
                    left: 460px;
                    opacity: 1;
                }

                80% {
                    top: 180px;
                    left: 340px;
                    opacity: 1;
                }

                100% {
                    top: 200px;
                    left: 300px;
                    opacity: 0;
                }
            }
        }
    }

    .text-404 {
        position: relative;
        float: left;
        overflow: hidden;
        width: 300px;
        padding: 30px 0;

        &__oops {
            font-size: 32px;
            font-weight: bold;
            line-height: 40px;
            margin-bottom: 20px;
            animation-name: slideUp;
            animation-duration: 0.5s;
            opacity: 0;
            color: #1482f0;
            animation-fill-mode: forwards;
        }

        &__headline {
            font-size: 20px;
            font-weight: bold;
            line-height: 24px;
            margin-bottom: 10px;
            animation-name: slideUp;
            animation-duration: 0.5s;
            animation-delay: 0.1s;
            opacity: 0;
            color: #222;
            animation-fill-mode: forwards;
        }

        &__info {
            font-size: 13px;
            line-height: 21px;
            margin-bottom: 30px;
            animation-name: slideUp;
            animation-duration: 0.5s;
            animation-delay: 0.2s;
            opacity: 0;
            color: grey;
            animation-fill-mode: forwards;
        }

        &__return-home {
            font-size: 14px;
            line-height: 36px;
            display: block;
            float: left;
            width: 110px;
            height: 36px;
            cursor: pointer;
            animation-name: slideUp;
            animation-duration: 0.5s;
            animation-delay: 0.3s;
            text-align: center;
            opacity: 0;
            color: #ffffff;
            border-radius: 100px;
            background: #1482f0;
            animation-fill-mode: forwards;
        }

        @keyframes slideUp {
            0% {
                transform: translateY(60px);
                opacity: 0;
            }

            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
    }
}
</style>
