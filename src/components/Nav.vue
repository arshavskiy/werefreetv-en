<template lang="html">

    <nav class="outer site-nav-main ">
        <input type="checkbox"/>
        <span></span>
        <span></span>
        <span></span>
        <div class="inner">

            <div class="site-nav-left">

                <div class="nav-links">
                    <router-link to="/">Главная</router-link>
                </div>
                <div class="nav-links mobile" v-for="page in pages" :key="page.id">
                    <router-link :to="{
                            name: page.url.split('.tv')[1].split('/')[1], 
                            params: { 
                                pageName: page.slug, 
                                html: page.html 
                                }
                            }">{{ page.title }}
                    </router-link>

                </div>
                <section class="desktop">
                    <div class="nav-links " v-for="page in pages" :key="page.id">
                        <router-link :to="{
                            name: page.url.split('.tv')[1].split('/')[1], 
                            params: { 
                                pageName: page.slug, 
                                html: page.html 
                                }
                            }">{{ page.title }}
                        </router-link>

                    </div>
                </section>
                <!-- <div class="nav-links nav-live">
                    <a href="https://broadcast.wearefree.tv/he.html">Live</a>
                </div> -->
                <!-- <div class="nav-links">
                    <router-link to="/survey">Survey</router-link>
                </div> -->


            </div>

            <div class="site-nav-right">
                <div class="nav_languages">
                    <!-- <a href="https://t.me/nocensorshiptv" class="social-link" target="_blank">
                        <img src="https://wearefreetv-assets.s3.eu-central-1.amazonaws.com/t_logo.png"
                            alt="Telegram account  https://t.me/nocensorshiptv" height="30"/>
                    </a> -->
                    <a href="https://www.wearefree.tv" class="lang_url"><span id="il"></span></a>
                    <a href="https://en.wearefree.tv" class="lang_url"><span id="un"></span></a>
                    <a href="https://ru.wearefree.tv" class="lang_url"><span id="ru"></span></a>

                </div>


            </div>
        </div>

    </nav>
</template>

<script lang="js">
import {contentApi} from '../services/contentApi';

export default {
    name: 'home',
    props: {},
    beforeMount() {
        this.fetchNav();
    },
    mounted() {
        // console.debug('nav:', this.$store);
    },
    data() {
        return {
            nav: [],
            pages: [],
            key: '86ada218ec30f07f1f44985d57',
        }
    },
    computed: {},
    methods: {

        async fetchNav() {
            // console.log('pages: ', this.pages);

            let api = contentApi.navAPI;
            fetch(api, {
                referrer: ""
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    this.pages = data.pages.filter(p => p.slug.includes('-ru'));
                    // console.log('this.pages:', this.pages);
                    this.$store.commit('pushData', this.pages);
                    this.$store.commit('pageLoaded', true);
                    this.loading = false;

                }).catch(e => {
                console.log(e);
                this.error = true;
            })
        },

    },
}
</script>

<style scoped>
body {
    direction: rtl;
}

a {
    text-decoration: none;
}

.outer {
    padding: 0 5vw;

}

.nav-links {
    position: relative;
    top: 19px;
}


.site-nav-main {
    position: fixed;

    background: #0a0b0c;
    top: 0;
    right: 0;
    left: 0;
    z-index: 2;
    height: 80px;
}

@media screen and (max-width: 768px) {
    .site-nav-main {
        height: 64px;
    }
}

.nav-live {
    background: url(https://broadcast.wearefree.tv/images/live_nav.png);
    height: 40px;
    min-width: 60px;
    display: flex;
    justify-content: center;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}

.site-nav-left .nav-live a {
    padding: 9px;
}

/*.en .site-nav-main{*/
/*    justify-content: center;*/
/*    align-items: center;*/
/*    display: flex;*/
/*}*/
/*.en .site-nav-main a{*/
/*    color: #fff;*/
/*}*/

nav input {
    display: none;
}

nav span {
    display: none;
}

nav .inner {
    background: url('/images/nav_logo.png') left center no-repeat #0a0b0c;
    margin: 0 auto;
    max-width: 1170px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}

.nav_languages{
    display: flex;
}

#un{
    background: url('/images/Eng_On.png') center no-repeat;
}
#il{
    background: url('/images/Heb_On.png') center no-repeat;
}
#ru{
    background: url('/images/Rus_On.png') center no-repeat;
}

nav a.lang_url span{
    width: 32px;
    height: 32px;
    display: block;
    border-radius: 50%;
}

/******************************** NAV LEFT SIDE ***************************************/
.site-nav-left {
    display: flex;
    align-items: center;
    margin-left: 190px;
}

.site-nav-logo {
    color: tomato;
    opacity: 0.8;
    transition: opacity 0.35s ease-in-out;
    font-size: 20px;
}

.site-nav-logo img {
    display: block;
    width: auto;
    height: 21px;
    position: relative;
}

.nav-links a {
    text-align: left;
    padding: 5px 12px;
    color: #fff;
    transition: opacity 0.35s ease-in-out;
    font-size: 16px;
    font-weight: 800;
}

/******************************** NAV RIGHT SIDE ***************************************/


.site-nav-right {
    display: flex;
    flex-direction: column;
    /* height: 70px; */
    justify-content: space-between;
}

.site-nav-right > a {
    padding: 0 10px;
    color: #fff;
}

.site-nav-right .nav-links a {
    position: relative;
    top: -10px;
}


social-link-fb svg, .social-link-wb svg {
    height: 1.6rem;
}

.social-link svg {
    height: 1.8rem;
    fill: #fff;
}

.site-nav-logo.mobile {
    display: none;
}

.site-nav-logo-big {
    margin: 0 auto;
    display: block;
    opacity: 1;
}

.site-nav-logo-big img {
    height: 50px;
    margin: auto;
    margin-top: 0;
    padding-top: 0;
    position: relative;
}

/******************************** MOBILE SCREEN ***************************************/
@media (max-width: 768px) {

    .site-nav-main {
        background: url('/images/nav_logo_small.png') center no-repeat #0a0b0c;
        width: auto;
        height: 64px;
    }

    nav .inner {
        position: absolute;
        top: 60px;
        left: -100%;
        flex-direction: column;
        width: inherit;
        background: #0a0b0c;
        height: calc(100vh - 250px);
        padding: 10px;
        padding-bottom: 20px;
        align-items: baseline;
        transition: 0.5s;
    }

    .site-nav-right {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: relative;
        top: -10px;
    }

    .site-nav-left {
        flex-direction: column;
        align-items: flex-start;
        margin: 0;
    }

    .site-nav-left > div {
        margin: 10px 0;
    }

    .site-nav-logo.mobile img {
        display: initial;
        height: 60px;
        margin: auto;
        margin-top: 0;
        padding-top: 0;
        position: relative;
        top: -25px;
    }

    /*.en .site-nav-logo.mobile img {*/
    /*    top: 0;*/
    /*}*/
    /******************************** ICON ANNIMATION ***************************************/
    nav input {
        display: block;
        width: 40px;
        height: 32px;
        position: absolute;
        top: 10px;
        left: 10px;
        cursor: pointer;
        opacity: 0;
        z-index: 1;
    }

    nav span {
        display: block;
        top: 20px;
        width: 33px;
        height: 5px;
        margin-bottom: 5px;
        position: relative;
        background: #cdcdcd;
        border-radius: 3px;
        transform-origin: 4px 0px;
        transition: transform 0.3s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.3s ease;
    }

    span:first-child {
        transform-origin: 0% 0%;
    }

    span:nth-child(2) {
        transform-origin: 0% 100%;
    }

    input:checked ~ span {
        transform: rotate(-45deg) translate(0, -1px);
    }

    input:checked ~ span:nth-child(3) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
    }

    input:checked ~ span:nth-child(2) {
        opacity: 1;
        transform: rotate(45deg) translate(-2px, -1px);
    }

    input:checked ~ .inner {
        left: 0;
    }
}

.desktop {
    display: none;
}

.mobile {
    display: initial;
}

@media only screen and (min-width: 768px) and (orientation: landscape) {
    .router-link-active {
        border-bottom: solid 7px #fff;
    }

    .mobile {
        display: none;
    }

    .desktop {
        display: flex;
    }
}
</style>