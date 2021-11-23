<template lang="html">

    <footer class="site-footer outer">
        <div class="site-footer-content inner">
            <a href="https://www.wearefree.tv">wearefree.tv © 2021 </a>
            <a href="https://wearefree.tv/privacy_policy/"> privacy policy </a>
        </div>
    </footer>

</template>

<script lang="js">

export default {
    name: 'home',
    props: {},
    mounted() {

    },
    data() {
        return {
            nav: [],
        }
    },
    methods: {},
    computed: {}
}
</script>

<style scoped>

.site-footer {
    position: relative;
    margin: 20px -8px 20px -8px;
    padding: 20px;
    color: #fff;
    background: #0a0b0c;
}

@media (max-width: 650px) {
    .site-footer .site-footer-content {
        flex-direction: column;
    }
}

.site-footer a, .site-footer {
    font-size: 14px;
}

.site-footer .site-footer-content, .site-footer-content a {
    color: hsla(0, 0%, 100%, .7);
}

.site-footer .site-footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    font-size: 1.3rem;
}

@media screen and (min-width: 800px) {
    .site-footer {
        background: none;
    }

    .site-footer .site-footer-content {
        justify-content: center;
    }

    .site-footer-content a {
        color: #101010;
    }
}

.site-footer .inner {
    margin: 0 auto;
    width: 100%;
}

.site-footer .inner {
    max-width: 1040px;
}

.site-footer .site-footer-nav {
    display: flex;
}

.site-footer .site-footer-content a {
    margin-left: 20px;
    text-decoration: none;
}

</style>