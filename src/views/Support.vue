<template>
    <!-- <Nav /> -->
    <section class="register">
        <h2>{{ getTitle }}</h2>
    </section>

    <span class="arrow-down"/>
    <span class="arrow-inner"/>

    <section class="page_holder">
        <article v-html="getDataFromNav"></article>
    </section>

</template>

<script>
// @ is an alias to /src
// import Nav from '../components/Nav.vue'


export default {
    name: 'Support',
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
        console.log('Register get page: ', this.page);
         document.querySelector('.site-nav-main>input').checked = false;

    },
    computed: {
        getDataFromNav() {
            return this.$store.getters.getData.html;
        },
        getTitle() {
            return this.$store.getters.getData.title;
        }
    },
    watch: {
        getDataFromNav(newNavData, old) {
            // Our fancy notification (2).
            this.page = newNavData;
            console.log(`We have ${old} state now, yay!`)
            console.log(`We have ${newNavData} state now, yay!`)
        }
    },
    methods: {},

}
</script>


<style>

.page_holder {

    background: #eee;
    min-height: 30vh;
    max-height: 700px;
    padding: 30px;
    margin: 0 -8px;
    padding-top: 30px;
    border-top: 1px solid rgb(185, 185, 185);

}

.register {
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
}

</style>
<style scoped>


</style>