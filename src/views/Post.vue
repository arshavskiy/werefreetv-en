<template>
    <main class="post">

        <h1>{{ post.title }}</h1>
        <p>{{ post.custom_excerpt }}</p>

        <PostMeta
            :date="post.dateForamted"
            :title="post.title"

        ></PostMeta>
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
    },
    mounted() {
        let params = this.post;
        window.scrollTo(0,0);
        this.fetchData(params.postId);
        // }

    },
    renderTriggered() {

    },
    computed: {},
    data() {
        return {
            post: {},
            error: null,
            loading: true,
            views: {},
            params: {}
        }
    },
    methods: {

        async addMeta() {

            document.head.querySelector('meta[property="og:title"]').setAttribute("content", this.post.title);
            document.head.querySelector('meta[property="og:description"]').setAttribute("content", this.post.custom_excerpt);
            document.head.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);
            document.head.querySelector('meta[property="og:image"]').setAttribute("content", this.post.feature_image);

            document.head.querySelector('meta[property="article:published_time"]').setAttribute("content", this.post.published_at);
            document.head.querySelector('meta[property="article:modified_time"]').setAttribute("content", this.post.updated_at);
            document.head.querySelector('meta[property="article:tag"]').setAttribute("content", this.post.tags[0].name);

            if (this.post.tags[1]) {
                document.head.querySelector('meta[property="article:tag"]').setAttribute("content", this.post.tags[1].name);
            }
            if (this.post.tags[2]) {
                document.head.querySelector('meta[property="article:tag"]').setAttribute("content", this.post.tags[2].name);
            }
            if (this.post.tags[3]) {
                document.head.querySelector('meta[property="article:tag"]').setAttribute("content", this.post.tags[3].name);
            }

            document.head.querySelector('meta[name="twitter:title"]').setAttribute("content", this.post.title);
            document.head.querySelector('meta[name="twitter:description"]').setAttribute("content", this.post.custom_excerpt);
            document.head.querySelector('meta[name="twitter:url"]').setAttribute("content", window.location.href);
            document.head.querySelector('meta[name="twitter:image"]').setAttribute("content", this.post.feature_image);

            document.head.querySelector('meta[name="description"]').setAttribute("content", this.post.custom_excerpt);
            document.head.querySelector('title').innerText = this.post.title;

        },

        async fetchData(postId) {

            let api =
                `https://www.wearefree.tv/ghost/api/v3/content/posts/slug/${postId}/?key=86ada218ec30f07f1f44985d57&include=tags`;

            fetch(api, {
                cache: "force-cache",
                cacheControl: "max-age=1500"
            })
                .then(response => response.json())
                .then(data => {
                    const post = data.posts[0];
                    console.debug("Post fetchData: ", post);

                    post.dateForamted = new Date(post.published_at).toLocaleDateString('en-US');
                    this.post = post;
                    this.loading = false;
                    this.$store.commit('pageLoaded', true);
                    this.addMeta();

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

@media screen and (min-width: 800) {
    main.post h1 {
        font-size: 3rem;
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

@media screen and (min-width: 800) {
    main.post > p {
        font-size: 24px;
    }
}

main.post p {
    word-break: break-word;
    text-align: left;
}

main.post a {
    color: #000;
}

main.post iframe.sproutvideo-player {
    width: 100%;
    height: calc(100vw / 1.7);
}

@media screen and (min-width: 800px) {
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