<template>

    <main class="en">

        <div class="post" v-for="post in posts" :key="post.id">
            <router-link :to="{ name: 'post', params: { postId: post.slug}}">
                <img class="main_image" :src="post.feature_image" loading="lazy" />
                <h3>{{post.title}}</h3>
                <p>{{post.excerpt}}</p>
            </router-link>

            <!-- <PostMeta/> -->
            <div class="post-card-meta">

                <div class="post-card-byline-content flex">

                    <span class="data post-card-byline-date flex">
                        <time datetime="2021-05-05">{{ dateForamt(post.published_at) }} </time>
                        <span> / </span>
                        <span class="bull">
                            <span class="bull-views" :data-post-url="post.slug"></span>
                        </span>
                    </span>

                    <span class="likes flex">
                        <span class="byline-meta-like"></span>
                        <img class="byline-like" src="https://wearefreetv-assets.s3.eu-central-1.amazonaws.com/like.svg"
                            alt="views" loading="lazy">
                    </span>

                </div>
            </div>

        </div>
        <div id="loadMore" v-on:click="shout($event)" />


    </main>
</template>

<script lang="js">
    // import PostMeta from './PostMeta.vue'


    export default {
        name: 'Feed',
        props: {
            msg: String,
        },
        beforeMount() {
            this.fetchData();
        },
        mounted() {
          
        },
        renderTriggered() {
            this.loadTrigger();
            
        },
        updated: function () {
            this.$nextTick(function () {
                // Code that will run only after the
                // entire view has been re-rendered
                this.getViews();
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
                pages: 1
            }
        },
        methods: {

            async fetchData() {

                console.log('posts 1', this.posts);

                let api = `https://www.wearefree.tv/ghost/api/v3/content/posts/?key=86ada218ec30f07f1f44985d57&&filter=tag:en&page=${this.page}&limit=10&include=tags`;
                
                fetch(api, {cache: "force-cache"})
                    .then(response => response.json())
                    .then(data => {
                        
                        this.posts = this.posts.concat(data.posts);
                        this.pages = data.meta.pagination.pages;
                        this.loading = false;

                        this.page++;

                    }).catch(e => {
                        console.log(e);
                        this.error = true;
                    })
            },

            //
            async getViews() {


                this.viewsDataSets = document.querySelectorAll("span[data-post-url]");
                let postUrls = [];

                // English posts
                this.viewsDataSets.forEach(function (set) {
                    postUrls.push(set.dataset.postUrl);
                });

                let dataObjRaw = {};
                let dataObjLike = {};

                const api =    'https://data.wearefree.tv/views';

                fetch(api, {cache: "force-cache"}).then(response => {
                    return response.json();
                    }).then(function (data) {

                    const spanList = document.querySelectorAll('.bull-views');

                    data.views = data.views.filter(function (d) {
                        return !d.id.includes('wearefree.tv');
                    });

                    data.views.forEach(function (item) {
                        dataObjRaw[item.id] = item.count;
                        dataObjLike[item.id] = item.like || 0;
                    });

                    function addData(span, url) {
                        if (!span.innerText) {
                            span.innerText = dataObjRaw[url];

                            const like = span.parentElement.parentElement.parentElement.querySelector('.byline-meta-like');

                            if (dataObjLike[url] > 0) {
                                like.innerText = dataObjLike[url];
                            }

                        }
                    }

                    postUrls.forEach(function (url) {
                        if (dataObjRaw[url]) {

                            spanList.forEach(function (span) {
                                let spansUrl = span.getAttribute('data-post-url');

                                if (spansUrl == url) {
                                    addData(span, url);
                                }

                            });
                        }
                    });
                });
            },


            dateForamt(data) {
                const options = {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                };
                const formatted = new Date(data).toLocaleDateString('en-US', options);
                return formatted

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
                            this.intersepted = true;
                        }

                        // observer.unobserve(entry.target);
                    }

                }

                let observer = new IntersectionObserver(handleIntersection.bind(this), options);

                observer.observe(document.querySelector('#loadMore'));
            }

        },
        computed: {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    main {
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
        box-shadow: 6px 6px 3px #101060;
        left: -10px;
        position: relative;
        filter: brightness(0.8);

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
        border: 1px solid;
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
    }

    .post-card-byline-content {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 2px 0 0 6px;
        color: #90a2aa;
        line-height: 1em;
        font-weight: 400;
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
    }

</style>