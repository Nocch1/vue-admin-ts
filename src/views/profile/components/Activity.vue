<template>
    <div class="user-activity">
        <div class="post">
            <div class="user-block">
                <img :src="'https://p4.music.126.net/s12ThsTOgK-NoNRIuWwjCQ==/109951164460258536.jpg'+avatarPrefix" class="img-circle">
                <span class="username text-muted">Extra</span>
                <span class="description">Shared publicly - 14:10 PM today</span>
            </div>
            <p>
                Man is walking sunflower, blooming is endless looking up to the ideal 😘
            </p>
            <ul class="list-inline">
                <li>
                    <span class="link-black text-sm">
                        <i class="el-icon-share" />
                        Share
                    </span>
                </li>
                <li>
                    <span class="link-black text-sm">
                        <svg-icon name="like" />
                        Like
                    </span>
                </li>
            </ul>
        </div>
        <div class="post">
            <div class="user-block">
                <img :src="'https://wpimg.wallstcn.com/57ed425a-c71e-4201-9428-68760c0537c4.jpg'+avatarPrefix" class="img-circle">
                <span class="username text-muted">Iron Man</span>
                <span class="description">Shared publicly - 7:30 PM today</span>
            </div>
            <p>
                Lorem ipsum represents a long-held tradition for designers,
                typographers and the like. Some people hate it and argue for
                its demise, but others ignore the hate as they create awesome
                tools to help create filler text for everyone from bacon lovers
                to Charlie Sheen fans.
            </p>
            <ul class="list-inline">
                <li>
                    <span class="link-black text-sm">
                        <i class="el-icon-share" />
                        Share
                    </span>
                </li>
                <li>
                    <span class="link-black text-sm">
                        <svg-icon name="like" />
                        Like
                    </span>
                </li>
            </ul>
        </div>
        <div class="post">
            <div class="user-block">
                <img :src="'https://wpimg.wallstcn.com/9e2a5d0a-bd5b-457f-ac8e-86554616c87b.jpg'+avatarPrefix" class="img-circle">
                <span class="username text-muted">Captain American</span>
                <span class="description">Sent you a message - yesterday</span>
            </div>
            <p>
                Lorem ipsum represents a long-held tradition for designers,
                typographers and the like. Some people hate it and argue for
                its demise, but others ignore the hate as they create awesome
                tools to help create filler text for everyone from bacon lovers
                to Charlie Sheen fans.
            </p>
            <ul class="list-inline">
                <li>
                    <span class="link-black text-sm">
                        <i class="el-icon-share" />
                        Share
                    </span>
                </li>
                <li>
                    <span class="link-black text-sm">
                        <svg-icon name="like" />
                        Like
                    </span>
                </li>
            </ul>
        </div>
        <div class="post">
            <div class="user-block">
                <img :src="'https://wpimg.wallstcn.com/fb57f689-e1ab-443c-af12-8d4066e202e2.jpg'+avatarPrefix" class="img-circle">
                <span class="username">Spider Man</span>
                <span class="description">Posted 4 photos - 2 days ago</span>
            </div>
            <div class="user-images">
                <el-carousel :interval="6000" height="220px" type="card">
                    <el-carousel-item v-for="item in carouselImages" :key="item">
                        <img :src="item + carouselPrefix" class="image">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <ul class="list-inline">
                <li><span class="link-black text-sm"><i class="el-icon-share" /> Share</span></li>
                <li>
                    <span class="link-black text-sm">
                        <svg-icon name="like" />
                        Like</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({

    setup() {
        const carouselImages = ref([
            'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
            'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
            'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
            'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
        ]);

        const avatarPrefix = ref('?imageView2/1/w/80/h/80');
        const carouselPrefix = ref('?imageView2/2/h/440');

        return { carouselImages, avatarPrefix, carouselPrefix };
    }
});
// import { Component, Vue } from 'vue-property-decorator'

// @Component({
//   name: 'Activity'
// })
// export default class extends Vue {
//   private carouselImages = [
//     'https://wpimg.wallstcn.com/9679ffb0-9e0b-4451-9916-e21992218054.jpg',
//     'https://wpimg.wallstcn.com/bcce3734-0837-4b9f-9261-351ef384f75a.jpg',
//     'https://wpimg.wallstcn.com/d1d7b033-d75e-4cd6-ae39-fcd5f1c0a7c5.jpg',
//     'https://wpimg.wallstcn.com/50530061-851b-4ca5-9dc5-2fead928a939.jpg'
//   ]

//   private avatarPrefix = '?imageView2/1/w/80/h/80'
//   private carouselPrefix = '?imageView2/2/h/440'
// }
</script>

<style lang="scss" scoped>
.user-activity {
    .user-block {
        .username,
        .description {
            display: block;
            margin-left: 50px;
            padding: 2px 0;
        }

        .username {
            font-size: 16px;
            color: #000;
        }

        :after {
            clear: both;
        }

        .img-circle {
            float: left;
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }

        span {
            font-size: 12px;
            font-weight: 500;
        }
    }

    .post {
        font-size: 14px;
        margin-bottom: 15px;
        padding-bottom: 15px;
        color: #666;
        border-bottom: 1px solid #d2d6de;

        .image {
            width: 100%;
            height: 100%;
        }

        .user-images {
            padding-top: 20px;
        }
    }

    .list-inline {
        margin-left: -5px;
        padding-left: 0;
        list-style: none;

        li {
            font-size: 13px;
            display: inline-block;
            padding-right: 5px;
            padding-left: 5px;
        }

        .link-black {
            &:hover,
            &:focus {
                color: #999;
            }
        }
    }
}

.box-center {
    display: table;
    margin: 0 auto;
}

.text-muted {
    color: #777;
}
</style>
