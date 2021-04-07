<template>
    <div v-loading.fullscreen.lock="fullscreenLoading" class="main-article" element-loading-text="Efforts to generate PDF">
        <div class="article__heading">
            <div class="article__heading__title">
                {{ article.title }}
            </div>
        </div>
        <div style="color: #ccc">
            This article is from Evan You on
            <a href="https://medium.com/the-vue-point/plans-for-the-next-iteration-of-vue-js-777ffea6fabf" target="_blank">medium</a>
        </div>
        <!-- eslint-disable vue/no-v-html -->
        <div class="node-article-content" v-html="article.content" />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import content from './content';

interface ArticlePdf {
    title?: String
    content?: String
}

export default defineComponent({

    setup() {
        const article = ref<ArticlePdf>({});
        const dataMap = reactive({
            fullscreenLoading: true,
            fetchData: () => {
                const { title } = content;
                document.title = title;
                article.value = content;

                setTimeout(() => {
                    dataMap.fullscreenLoading = false;
                }, 2000);

                setTimeout(() => {
                    window.print();
                }, 2600);
            }
        });

        onMounted(() => {
            dataMap.fetchData();
        });
        return { ...toRefs(dataMap), article };
    }
});
</script>

<style lang="scss" scoped>
.main-article {
    display: block;
    width: 740px;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
}

.article__heading {
    position: relative;
    overflow: hidden;
    padding: 0 0 20px;
}

.article__heading__title {
    font-size: 32px;
    font-weight: 600;
    line-height: 48px;
    display: block;
    display: -webkit-box;
    overflow: hidden;
    word-wrap: break-word;
    color: #333;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow-wrap: break-word;
}

.node-article-content {
    font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman",
    Times, serif;

    font-size: 16px;
    @include clearfix;
    line-height: 28px;
    margin: 20px 0 0;
    margin-bottom: 30px;
    letter-spacing: 0.5px;
    color: #333;
    background-color: #333;

    & > :last-child {
        margin-bottom: 0;
    }

    b,
    strong {
        font-weight: inherit;
        font-weight: bolder;
    }

    img {
        display: block;
        max-width: 100%;
        margin: 0 auto;
    }

    p {
        font-size: 21px;
        font-weight: 400;
        font-style: normal;
        line-height: 1.58;
        letter-spacing: -0.003em;
    }

    ul {
        margin-bottom: 30px;
    }

    li {
        font-size: 21px;
        font-weight: 400;

        font-style: normal;
        line-height: 1.58;
        margin-bottom: 14px;
        margin-left: 30px;
        letter-spacing: 0.01rem;
        letter-spacing: -0.003em;
        --x-height-multiplier: 0.375;
        --baseline-multiplier: 0.17;
    }

    a {
        padding: 0 6px;
        text-decoration: none;
        background-image: linear-gradient(
                to right,
                rgba(0, 0, 0, 0.84) 100%,
                rgba(0, 0, 0, 0) 0
        );
        background-repeat: repeat-x;
        background-position: 0 calc(1em + 1px);
        background-size: 1px 1px;
    }

    code {
        font-size: 16px;
        display: inline-block;
        margin: 0 2px;
        padding: 3px 4px;
        background: rgba(0, 0, 0, 0.05);
    }

    img {
        border: 0;
    }

    /* 解决 IE6-7 图片缩放锯齿问题 */
    img {
        -ms-interpolation-mode: bicubic;
    }

    blockquote {
        font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman",
        Times, serif;
        font-size: 21px;
        font-weight: 400;
        font-style: italic;
        line-height: 1.58;
        margin-left: -23px;
        padding-bottom: 2px;
        padding-left: 20px;
        letter-spacing: 0.01rem;
        letter-spacing: -0.003em;
        border-left: 3px solid rgba(0, 0, 0, 0.84);
        --x-height-multiplier: 0.375;
        --baseline-multiplier: 0.17;
    }

    a {
        text-decoration: none;
    }

    h2,
    h3,
    h4 {
        font-size: 34px;
        line-height: 1.15;
        margin: 53px 0 0;
        letter-spacing: -0.015em;
    }

    h4 {
        font-size: 26px;
    }
}
</style>
