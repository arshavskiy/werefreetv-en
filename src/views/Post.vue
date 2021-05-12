<template>
    <main class="post">

        <h1>{{post.title}}</h1>
        <p>{{post.custom_excerpt}}</p>

        <PostMeta :date="post.dateForamted"></PostMeta>
        <article id="page" v-html="post.html"></article>

        <Comments/>



    </main>
</template>

<script>
    // @ is an alias to /src
    import PostMeta from '../components/PostMeta.vue'
    import Comments from '../components/Comments.vue'


    export default {
        name: 'Post',
        components: {
            PostMeta,
            Comments
        },
        beforeMount() {
            this.post = this.$route.params;
            this.post.dateForamted = new Date(this.post.published_at).toLocaleDateString('en-US');
            // this.post.gotContentFromFeed = true;
        },
        mounted() {
            let params = this.post;
            console.debug("post:", params);
        
            // if (!params.gotContentFromFeed) {
                this.fetchData(params.postId);
            // }

        },
        computed: {

        },
        data() {
            return {
                post: {},
                error: null,
                loading: true,
                views: {},
                params: {}
                // id: this.$route.postId = window.location.pathname.split('/')[2],
                // id2: this.$route.postId2 = this.postId2

            }
        },
        methods: {


            async fetchData(postId) {

                let api =
                    `https://www.wearefree.tv/ghost/api/v3/content/posts/slug/${postId}/?key=86ada218ec30f07f1f44985d57&include=tags`;

                fetch(api, {
                        cache: "force-cache"
                    })
                    .then(response => response.json())
                    .then(data => {
                        const post = data.posts[0];
                        console.log("Post: ", post);

                        post.dateForamted = new Date(post.published_at).toLocaleDateString('en-US');
                        this.post = post;

                        this.loading = false;

                    }).catch(e => {
                        console.log(e);
                        this.error = true;
                    });

            },


        },

    }
</script>

<style>
    main.post {
        max-width: 800px;
        margin: 0 auto;
        font-family: sans-serif;
    }

    main.post h1 {
        color: #000;
        text-align: left;
    }

    @media screen and (min-width:800) {
        main.post h1 {
            font-size: 3rem;
        }
    }

    main.post>p {
        text-align: left;
        overflow-wrap: break-word;
        font-size: 14px;
        color: #738a94;
        font-family: inherit;
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;
    }

    @media screen and (min-width:800) {
        main.post>p {
            font-size: 24px;
        }
    }

    main.post p {
        word-break: break-word;
    }

    main.post a {
        color: #000;
    }

    main.post iframe.sproutvideo-player {
        width: 100%;
        height: calc(100vw / 1.7);
    }

    @media screen and (min-width:800px) {
        main.post iframe.sproutvideo-player {
            width: 100%;
            height: 377px;
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