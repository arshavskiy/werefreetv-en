<template>
    <!-- <Nav /> -->
    <section class="register">
        <h1>Join us </h1>
        <article v-html="getDataFromNav"></article>
    </section>
</template>

<script>
    // @ is an alias to /src
    // import Nav from '../components/Nav.vue'


    export default {
        name: 'Register',
        components: {
            // Nav,
        },
        data() {
            return {
                page: {}
            }
        },
        beforeMount() {
            this.page = this.$route.params;
            this.page.gotContentFromFeed = true;
        },
        mounted() {
            let params = this.page;
            console.debug("Register params:", params);
            console.debug('register 1 getters:', this.$store.getters.getData);


            // let debug = this.$store.getters.getData.filter(n=>n.slug.includes(this.$route.name));
            // console.debug('register 1 getData:', debug);

            console.log('Register get page: ', this.page);

            // if (!this.page.gotContentFromFeed) {
                // this.getPage(this.page.pageName);
            // }

        },
        computed: {
            getDataFromNav () {
                // this.$store.getters.getData.filter(n=>n.slug.includes(this.$route.name)).pop()
                return this.$store.getters.getData;              
            }
        },
        watch: {
            getDataFromNav (newNavData, old) {
            // Our fancy notification (2).
                console.log(`We have ${old} state now, yay!`)
                console.log(`We have ${newNavData} state now, yay!`)
            }
        },
        methods: {

            // (function(d, s, id) {
            // var js, fjs = d.getElementsByTagName(s)[0];
            // if (d.getElementById(id)) return;
            // js = d.createElement(s); js.id = id;
            // js.src = "//forms.aweber.com/form/34/1679204634.js";
            // fjs.parentNode.insertBefore(js, fjs);
            // }(document, "script", "aweber-wjs-ux2mk7xrx"));

            async getPage(pageName) {
                console.log('Register page: ', this.pages);

                let api =
                    `https://www.wearefree.tv/ghost/api/v3/content/page/slug/${pageName}?key=86ada218ec30f07f1f44985d57`;

                fetch(api, {
                        cache: "force-cache"
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        this.page = data.pages;

                        console.debug('register 2 getters:', this.$store.getters.getData);
                        

                        this.loading = false;

                    }).catch(e => {
                        console.log(e);
                        this.error = true;
                    })
            }

        },

    }
</script>