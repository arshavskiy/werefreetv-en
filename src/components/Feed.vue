<template>

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
                <h3>{{ post.title }}</h3>
                <p>{{ post.excerpt }}</p>
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

        </div>
        <div id="loadMore"/>


    </section>
</template>

<script lang="js">
// import PostMeta from './PostMeta.vue'
import {utils} from '../utils';

export default {
    name: 'Feed',
    props: {
        msg: String,
    },
    beforeMount() {
        this.getViews();
        this.fetchData();
        this.$store.commit('initLoader', false);
    },
    mounted() {

    },
    renderTriggered() {
        // console.debug('$renderTriggered');
        // this.loadTrigger();

    },
    updated: function () {
        this.$nextTick(function () {
            console.debug('$nextTick');
            this.loadTrigger();

            // this.getViews();
        })
    },
    data() {
        return {
            posts: [],
            views: [],
            viewsDataSets: [],
            error: null,
            intersepted: false,
            loading: true,
            page: 1,
            pages: 1,
            dataObjRaw: {},
            dataObjLike: {}
        }
    },
    computed: {

    },
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
        loadTrigger() {

            let options = {
                rootMargin: '0px',
                threshold: 1.0
            }

            function handleIntersection(entries) {
                if (entries[0].isIntersecting && !this.intersepted) {
                    console.log('Log event and unobserve', entries[0]);
                    if (this.pages >= this.page) {
                        this.fetchData();
                        // this.intersepted = true;
                    }
                }
            }

            let observer = new IntersectionObserver(handleIntersection.bind(this), options);

            observer.observe(document.querySelector('#loadMore'));
        },
        fetchData() {
            let api = `https://www.wearefree.tv/ghost/api/v3/content/posts/?key=86ada218ec30f07f1f44985d57&&filter=tag:en&page=${this.page}&limit=10&include=tags`;

            fetch(api, {cache: "force-cache"})
                .then(response => response.json())
                .then(data => {

                    this.posts = this.posts.concat(data.posts);

                    data.posts.forEach(post => {
                        localStorage.setItem(post.slug, JSON.stringify(post));
                    });

                    this.pages = data.meta.pagination.pages;
                    this.loading = false;
                    this.$store.commit('pageLoaded', true);
                    this.page = data.meta.pagination.next; 

                }).catch(e => {
                console.log(e);
                this.error = true;
            })
        },
        getViews() {

            // this.viewsDataSets = document.querySelectorAll("span[data-post-url]");
            // let postUrls = [];
            //
            // this.viewsDataSets.forEach(function (set) {
            //     postUrls.push(set.dataset.postUrl);
            // });

            const api = 'https://data.wearefree.tv/views';

            fetch(api, {
                cacheControl: "max-age=1500"
            }).then(response => {
                return response.json();
            }).then(data => {

                // const feedItemsList = postUrls.toString();
                //
                // this.views = data.views.filter(function (d) {
                //     return feedItemsList.includes(d.id);
                // });

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
    border-bottom: 1px solid #ccc;
    padding-bottom: 30px;
    padding: 15px;
}

.post a {
    text-decoration: none;
    color: #101010;
}

img.main_image {
    width: 100%;
    height: 195px;

    border-radius: 5px;
    padding: 4px;
    border: 1px solid;
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

#loadMore {
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
    justify-content: space-between;
    width: 100%;
    margin: 2px 0 0 6px;
    color: #90a2aa;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: .2px;
    text-transform: uppercase;
}

.post-card-byline-date .bull {
    display: inline-block;
    margin: 0 4px;
    opacity: .6;
}

.post-card-byline-content span {
    margin: 0;
    min-width: 20px;
}

</style>