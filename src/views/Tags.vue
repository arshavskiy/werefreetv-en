<template>
    <h1>#{{ tag }}</h1>
    <section class="en">
        <div v-for="post in posts" :key="post.id" class="post">
            <router-link :to="{ 
                name: 'post', 
                params: { 
                            post:post,
                            postId: post.slug,
                            tags: post.tags,
                            html: post.html,
                            title: post.title,
                            custom_excerpt: post.custom_excerpt,
                            published_at: post.published_at
                     }}">

                <img :src="post.feature_image" class="main_image" loading="lazy"/>
                <section class="post_data">
                    <div>
                        <h2>{{ post.title }}</h2>
                        <p class="post_subtitle">{{ post.excerpt }}</p>

                    </div>
                </section>
            </router-link>

            <div class="post-card-meta">
                <div class="post-card-byline-content flex">
                    <span class="data post-card-byline-date flex">
                        <time datetime="2021-05-05">{{ dateForamt(post.published_at) }} </time>
                        <img alt="views"
                             class="byline-meta-views-img" loading="lazy"
                             src="https://wearefreetv-assets.s3.eu-central-1.amazonaws.com/witness.png">
                        <span class="bull">
                            <span :data-post-url="post.slug" class="bull-views">{{ setViews(post.slug) }}</span>
                        </span>
                    </span>
                    <span class="likes flex">
                        <img alt="views"
                             class="byline-like"
                             loading="lazy"
                             src="https://wearefreetv-assets.s3.eu-central-1.amazonaws.com/like.svg">
                        <span class="byline-meta-like">{{ setLikes(post.slug) }}</span>
                    </span>

                </div>
            </div>
            <div class="tags flex">
                <span v-for="(t, index) in post.tags" :key="index">
                    <router-link :to="{ name: 'tag', params: { tagName: t.name }}">{{ t.name }}</router-link>
                </span>
            </div>
        </div>
        <div id="loadMore2"/>
    </section>
</template>

<script lang="js">
// import PostMeta from './PostMeta.vue'
import {contnet, utils} from '../utils';

export default {
    name: 'Feed',
    props: {
        msg: String,
    },
    beforeMount() {
        this.tag = this.$route.params.tagName;
        this.getViews();
        this.fetchData();
        this.fetchTags();
        this.$store.commit('initLoader', false);
    },
    mounted() {
        // console.debug('$renderTriggered');
        window.addEventListener('scroll', this.loadTrigger);
        this.loadTrigger();

    },
    renderTriggered() {
        // console.debug('$renderTriggered');
    },
    updated: function () {
        this.$nextTick(function () {
            // console.debug('$nextTick');
            // this.getViews();
        })
    },
    data() {
        return {
            posts: [],
            views: [],
            tags: [],
            tag: [],
            viewsDataSets: [],
            error: null,
            // intersepted: false,
            loading: true,
            params: {},
            page: 1,
            pages: 1,
            dataObjRaw: {},
            dataObjLike: {}
        }
    },
    computed: {},
    methods: {
        setViews(id) {
            // console.debug('setViews id', id);
            // console.debug('setViews this.dataObjRaw[id]', this.dataObjRaw[id]);
            return this.dataObjRaw[id];
        },
        setLikes(id) {
            // console.debug('setLikes id', id);
            // console.debug('setLikes this.dataObjRaw[id]', this.dataObjLike[id]);
            return this.dataObjLike[id];
        },
        dateForamt(date) {
            return utils.dateForamt(date);
        },

        fetchTags() {
            let decodedTag = decodeURIComponent(encodeURIComponent(this.tag));
            let api = contnet.tagsAPI + `&${decodedTag}`;

            fetch(api, {cache: "force-cache"})
                .then(response => response.json())
                .then(data => {
                    // console.log(data.tags);
                    this.tags = data.tags;
                }).catch(e => {
                console.log(e);
                this.error = true;
            })
        },

        fetchData() {

            let decodedTag = decodeURIComponent(encodeURIComponent(this.tag));
            let api = contnet.postByTagAPI + `&filter=tag:${decodedTag}&page=${this.page}`;

            fetch(api, {cache: "force-cache"})
                .then(response => response.json())
                .then(data => {
                    // console.log(data.posts);
                    if (data.posts.length === 0) this.$router.push({path: '/'});
                    data.posts = data.posts.filter(p => {
                        if (/[A-Za-z]/.test(p.title)) {
                            return null
                        } else {
                            return p;
                        }
                    });
                    this.posts = this.posts.concat(data.posts);

                    data.posts.forEach(post => {
                        localStorage.setItem(post.slug, JSON.stringify(post));
                    });
                    this.pages = data.meta.pagination.pages;
                    this.loading = false;
                    this.$store.commit('pageLoaded', true);
                    this.page = data.meta.pagination.next || 1;

                }).catch(e => {
                    console.log(e);
                    this.$router.push({path: '/'});
                    // this.error = true;
            })
        },

        debounce(func, timeout = 300) {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args);
                }, timeout);
            };
        },

        loadTrigger() {


            let options = {
                rootMargin: '0px',
                threshold: 1.0
            }

            function handleIntersection(entries) {
                if (entries[0].isIntersecting && this.page) {
                    if (this.page < this.pages) {
                        console.log('Log event and unobserve', entries[0]);
                        if (this.page <= this.pages) {
                            this.fetchData();
                        }
                    }
                }
            }

            let observer = new IntersectionObserver(handleIntersection.bind(this), options);
            const triggerElm = document.querySelector('#loadMore2');
            if (triggerElm) {
                const processChange = this.debounce(() => observer.observe(triggerElm));
                processChange();
            }

        },

        getViews() {

            const api = contnet.dataViews;

            fetch(api, {
                cacheControl: "max-age=1500"
            }).then(response => {
                return response.json();
            }).then(data => {

                this.views = data.views;
                this.views.forEach(item => {
                    this.dataObjRaw[item.id] = item.count;
                    this.dataObjLike[item.id] = item.like || 0;
                });
            });

        },
    },

}
</script>

<style scoped>
section {
    display: flex;
    flex-wrap: wrap;
}

.post {
    width: 85vw;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    margin-bottom: 20px;
    /* border-bottom: 1px solid #ccc; */
    padding-bottom: 30px;
    padding: 15px;
}

.post_data {
    display: flex;
}

.post a {
    text-decoration: none;
    color: #101010;
}

h2 {
    font-size: 1.3rem;
}

p.post_subtitle {
    font-size: 1rem;
    color: #444;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

img.main_image {
    width: 100%;
    height: 195px;
    border-radius: 5px;
    padding: 4px;
    /* border: 1px solid; */
    /* box-shadow: 6px 6px 3px #101060; */
    left: -10px;
    position: relative;
    /* filter: brightness(0.8); */
}

h3 {
    margin: 10px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

#loadMore2 {
    height: 1px;
    width: 100%;
}

.post-card-meta {
    display: flex;
    align-items: flex-start;
    padding: 0;

}

.post {
    text-align: left;
}

.post footer {
    font-size: .8rem;
}

.post h3 {
    text-align: left;
}


footer {
    font-size: .8rem;
}

.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}


.byline-meta-views-img {
    margin: 0 10px;
    height: 20px;
}

.byline-like {
    height: 20px;
    padding: 0 5px;
    position: relative;
    top: -5px;
}

.post-card-byline-content {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin: 5px 0;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: .2px;
    text-transform: uppercase;
}

.post-card-byline-date .bull {
    display: inline-block;
    margin: 0 7px 0 -3px;
    opacity: .6;
    color: #555;
}

.post-card-byline-content span {
    margin: 0;
    min-width: 20px;
}

.tags {
    position: relative;
    top: -24px;
    text-decoration: underline;
    font-size: 10px;
    display: flex;
    justify-content: flex-end;
    font-weight: bold;
    align-items: center;
    flex-wrap: wrap;
}

.tags span {
    margin-right: 10px;
}

@media screen and (orientation: portrait) {

}

@media only screen and (min-width: 768px) and (orientation: landscape) {

    .tags {
        /* justify-content: flex-start;
        top: 0; */
    }

    .post_data {
        height: 177px;
        display: flex;
        align-content: space-between;
    }

    .post:first-child {
        width: 100%;
        max-width: 1200px;
    }

    .post:first-child h2 {
        font-size: 1.5rem;
    }
    .post:first-child .tags {
        justify-content: flex-end;
        top: -29px;
        /* right: 514px;    */
    }

    .post:first-child .post-card-meta {
        width: 400px;
    }

    .post:first-child section {
        width: 440px;
        display: block;
        margin-top: 80px;
    }

    .post:first-child img.main_image {
        width: 600px;
        height: auto;
    }

    .post:first-child a {
        display: flex;
        /* justify-content: space-around; */
    }


}
</style>