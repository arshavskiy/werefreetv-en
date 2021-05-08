<template lang="html">
  
    <section class="post-card-meta">
        <div class="post-card-byline-content">
            <span class="data post-card-byline-date flex">
                <time> {{date}} </time>
                <img class="byline-meta-views-img" src="https://wearefreetv-assets.s3.eu-central-1.amazonaws.com/witness.png" alt="views" loading="lazy">                <!-- <span class="bull"> -->
                <span class="bull-views">{{views.count}}</span>
            </span>

            <span class="likes flex">
                <img class="byline-like" src="https://wearefreetv-assets.s3.eu-central-1.amazonaws.com/like.svg"
                    alt="views" loading="lazy">

                <span class="byline-meta-like">{{views.like}}</span>

            </span>

        </div>
    </section>

</template>
 
<script lang="js">

  export default  {
    name: 'PostMeta',
    props: {
        date: String,
        propTest: String
    },
      data() {
      return {
        params: {},
        views: {},
        newViews: {},
      }
    },
    beforeMount() {
       this.params = this.$route.params;
    },
    mounted() {
       this.getPostMeta()
    },
    methods: {

      async getPostMeta(){

            console.log('post params: ', this.params);
            
            fetch('https://data.wearefree.tv/counter/' + this.params.postId)
                .then(response => response.json())
                .then(data => {
                    this.views = data.views
                });
        }
    },
    computed: {
 
    }
}
</script>
 
<style scoped>

    section {
        font-size: .8rem;
    }

    .flex {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .post-card-meta{
        width: calc(100vw - 40px);
        margin: 6px auto;
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
        align-items: center;
        max-width: 800px;
        max-width: 800px;
        color: #000;
        font-weight: 400;
        font-size: .8rem;
        line-height: 1.2em;
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
    .byline-meta-views-img {
        margin: 0 10px;
        height: 20px;
    }

</style>