<template>
    <main class="post">

        <h2>{{ post.title }}</h2>
        <p>{{ post.custom_excerpt }}</p>

        <PostMeta :date="post.dateForamted" :title="post.title" :tags="post.tags"/>
        
        <article id="page" v-html="post.html"></article>

        <Comments />

    </main>
</template>

<script>
    // @ is an alias to /src
    import PostMeta from '../components/PostMeta.vue'
    import Comments from '../components/Comments.vue'
    import {utils, contnet} from '../utils'


    export default {
        name: 'Post',
        components: {
            PostMeta,
            Comments
        },
        data() {
            return {
                post: {},
                error: null,
                loading: true,
                views: {},
                params: {},
                postId: String,
            }
        },
        beforeMount() {
            this.post = this.$route.params;
            let date = utils.dateForamt(new Date(this.post.published_at));
            this.post.dateForamted = date;
        },
        mounted() {
            console.debug('mounted()');

            window.scrollTo(0, 0);
            this.postId = this.post.postId;

            this.fetchData(this.postId).then(post => {
                this.post = post;
                let date = utils.dateForamt(new Date(this.post.published_at));
                this.post.dateForamted = date;

                this.$store.commit('pageLoaded', true);
                localStorage.setItem(this.postId, JSON.stringify(this.post));
                this.$store.commit('pageLoaded', true);

                this.addMeta(post);
            });
        },
        renderTriggered() {
            console.debug('renderTriggered()');
        },
        computed: {},
        methods: {

            addMeta(post) {

                try {
                    document.querySelector('[rel="canonical"]').setAttribute("href", window.location.href);
                    document.querySelector('meta[property="og:title"]').setAttribute("content", post.title);
                    document.querySelector('meta[property="og:description"]').setAttribute("content", post.custom_excerpt);
                    document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
                    document.querySelector('meta[property="og:image"]').setAttribute("content", post.feature_image);
                    document.querySelector('meta[property="article:published_time"]').setAttribute("content", post.published_at);
                    document.querySelector('meta[property="article:modified_time"]').setAttribute("content", post.updated_at);
                    document.querySelector('meta[property="article:tag"]').setAttribute("content", post.tags[2].name);
                    document.querySelector('meta[name="twitter:title"]').setAttribute("content", post.title);
                    document.querySelector('meta[name="twitter:description"]').setAttribute("content", post.custom_excerpt);
                    document.querySelector('meta[property="twitter:url"]').setAttribute("content", window.location.href);
                    document.querySelector('meta[name="twitter:image"]').setAttribute("content", post.feature_image);
                    document.querySelector('meta[name="description"]').setAttribute("content", post.custom_excerpt);
                    document.title = post.title;
                } catch (error) {
                    console.debug(error);
                }

            
            },

            fetchData(postId) {
                return new Promise((resolve, reject) => {
                    let api = contnet.postAPI + `${postId}/?key=86ada218ec30f07f1f44985d57&include=tags`;

                    fetch(api, {
                            cacheControl: "max-age=1500"
                        }).then(response => response.json())
                        .then(data => {
                            const post = data.posts[0];
                            console.debug("Post fetchData: ", post);

                            post.dateForamted = new Date(post.published_at).toLocaleDateString('en-US');
                            resolve(post);

                        }).catch(e => {
                            console.log(e);
                            this.error = true;
                            reject(e);
                        });
                });

            },


        },

    }
</script>

<style>

    iframe {
        max-width: 100%;
        height: auto;
    }

    main.post {
        max-width: 800px;
        margin: 0 auto;
        font-family: sans-serif;
    }

    main.post h2 {
        color: #000;
        text-align: left;
    }

    @media screen and (min-width: 800px) {
        main.post h2 {
            font-size: 2rem;
        }
    }

    main.post > p {
        text-align: left;
        overflow-wrap: break-word;
        font-size: 14px;
        color: #738a94;
        font-family: inherit;
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;
    }

     .post #page p {
        font-size: 12px;
    }

    @media screen and (min-width: 800px) {
        main.post>p {
            font-size: 1rem;
        }
    }

    main.post p {
        word-break: break-word;
        text-align: left;
    }

    main.post a {
        color: #000;
    }

    main.post iframe {
        width: 100%;
        height: calc(100vw / 1.85);
    }

    @media screen and (min-width: 800px) {
        main.post iframe {
            width: 100%;
            height: 450px;
        }
    }

    main.post section {
        font-size: .8rem;
    }

    main.post .flex {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    main.post .post-card-byline-content {
        padding-bottom: 20px;
    }
</style>