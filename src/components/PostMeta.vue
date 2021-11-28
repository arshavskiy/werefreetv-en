<template lang="html">

    <section class="post-card-meta">
        <div class="post-card-byline-content">
            <span class="data post-card-byline-date flex">
                <time> {{ date }} </time>
                <img class="byline-meta-views-img"
                     src="https://wearefreetv-assets.s3.eu-central-1.amazonaws.com/witness.png" alt="views"
                     loading="lazy">                  
                <span class="bull-views">{{ views.count }}</span>
                <div class="tags flex">
                    <span v-for="(t, index) in tags" :key="index">
                        <router-link
                            :to="{ name: 'tag', params: { tagName: t.slug, tag: t.name }}">{{
                                filterTags(t.name)
                            }}</router-link>
                    </span>
                </div>
            </span>

            <span class="likes flex" v-on:click.once="setLike($event)">

                 <img v-if="webShareApiSupported" class="share_btn" loading="lazy" v-on:click="sharePost"
                      src="https://wearefreetv-assets.s3.eu-central-1.amazonaws.com/assets/share_64x64.png"
                      alt="Share us">

                <img class="byline-like" src="https://wearefreetv-assets.s3.eu-central-1.amazonaws.com/like.svg"
                     alt="views" loading="lazy">
                <span class="byline-meta-like">{{ views.like }}</span>
            </span>

        </div>
    </section>

</template>

<script lang="js">

export default {
    name: 'PostMeta',
    props: {
        date: String,
        propTest: String,
        title: String,
        image: String,
        text: String,
        published: String,
        updated: String,
        tags: {},
    },

    data() {
        return {
            params: {},
            views: {},
            newViews: {},
        }
    },
    created() {
        // console.debug('created:', this);
    },
    beforeMount() {
        this.params = this.$route.params;
    },
    mounted() {
        this.getPostMeta();
        // console.debug('mounted:', this);

    },
    computed: {
        webShareApiSupported() {
            return navigator.share
        },
    },
    renderTriggered() {
    },
    methods: {
        filterTags(tagName) {
            if (tagName && tagName.includes('ru')) return null
            else if (tagName && tagName.includes('en')) return null
            else return tagName;
        },
        sharePost() {
            if (navigator.share) {
                const title = this.title || document.title;
                let shareUrl = document.location.pathname.replace('/post/', '') + '.html';
                shareUrl = 'https://ru.wearefree.tv/' + shareUrl + '?referral=site'

                navigator.share({
                    title: title,
                    text: this.text,
                    url: shareUrl
                }).then(function () {
                    return console.log('Successful share');
                }).catch(function (error) {
                    return console.log('Error sharing', error);
                });
            }

        },
        setLike(event) {

            const path = event.path || (event.composedPath && event.composedPath());
            let type = path[0].className.includes('dislike') ? 'dislike' : 'like';
            let dynamicPath = '/' + this.params.postId;

            fetch('https://data.wearefree.tv/' + type + dynamicPath, {
                cacheControl: "max-age=1500"
            })
                .then(response => response.json())
                .then(json => {
                    console.debug("PostMeta fetchData: ", json);
                    this.views.like = json.views.like;
                });

        },

        async getPostMeta() {
            fetch('https://data.wearefree.tv/counter/' + this.params.postId)
                .then(response => response.json())
                .then(data => {
                    this.views = data.views
                });
        }
    },

}
</script>

<style scoped>

.hide {
    display: none;
}

section {
    font-size: .8rem;
}

.flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.post-card-meta {
    /* width: calc(100vw - 40px); */
    margin: 6px auto;
}

.byline-meta-views-img {
    margin: 0 10px;
    height: 20px;
}

.byline-like {
    height: 20px;
    padding: 0 5px;
    margin-left: 10px;
    position: relative;
    top: -5px;
}

.post-card-byline-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 800px;
    color: #000;
    font-weight: 400;
    font-size: 10px;
    letter-spacing: .2px;
    /* text-transform: uppercase; */
}

.post-card-byline-date .bull {
    display: inline-block;
    margin: 0 7px 0px -1px;
    opacity: .6;
}

.post-card-byline-content span {
    margin: 0;
}

.byline-meta-views-img {
    margin: 0 10px;
    height: 20px;
}

.share_btn {
    height: 20px;
}

.tags {
    margin: 0 20px;
}

.tags span {
    padding: 0 5px;
}
</style>