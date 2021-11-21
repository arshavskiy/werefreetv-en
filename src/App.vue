<template>
    <Nav/>
    <Loader/>
    <main>
        <router-view/>
    </main>
    <Footer/>
</template>

<script lang="js">

import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
import Loader from "./components/Loder";

export default {
    name: 'app',
    components: {
        Loader,
        Nav,
        Footer
    },
    props: {},
    mounted() {

    },
    data() {
        return {
            nav: [],
        }
    },
    methods: {},
}
</script>
<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: relative;
    top: 80px;
    /* max-width: 1200px; */
    /* margin: 0 auto; */
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

#mailFormPopUp {
    border:2px solid;
    display: none;
    position: absolute;
    top: calc(50vh - 140px);
    left: calc(50vw - 153px);
    z-index: 10;
    width: 300px;
    background: #fff;
}

#mailFormPopUp #af-form-1679204634 {
    border-top: none;
}

.mailFormPopUp_header{
    background: #fff;
        text-align: center;
        padding: 0;
}
</style>
