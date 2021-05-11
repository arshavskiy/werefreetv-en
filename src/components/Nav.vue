<template lang="html">

      <nav class="outer site-nav-main">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <div class="inner">

            <div class="site-nav-left">

                <div class="nav-links">
                    <router-link to="/">Home</router-link>
                </div>
                <div class="nav-links" v-for="page in pages" :key="page.id">
                    <router-link :to="{
                        name: page.url.split('.tv')[1].split('/')[1], 
                        params: { 
                            pageName: page.slug, 
                            html: page.html 
                            }
                        }">{{page.title}}</router-link>

                </div>
            </div>

            <div class="site-nav-right">
                <a href="https://t.me./wearefreetv" class="social-link" target="_blank">
                    <img src="https://wearefreetv-assets.s3.eu-central-1.amazonaws.com/t_logo.png"
                        alt="Telegram account https://t.me./wearefreetv" height="30" />
                </a>
                <a class="social-link social-link-fb" href="https://www.facebook.com/NoCensorshipHere"
                    title="הקבוצה שלנו בפייסבוק" target="_blank" rel="noopener">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm5.204 4.911h-3.546c-2.103 0-4.443.885-4.443 3.934.01 1.062 0 2.08 0 3.225h-2.433v3.872h2.509v11.147h4.61v-11.22h3.042l.275-3.81h-3.397s.007-1.695 0-2.187c0-1.205 1.253-1.136 1.329-1.136h2.054V4.911z">
                        </path>
                    </svg>
                </a>
                <a class="social-link" href="https://www.patreon.com/wearefreetv" title="לתמוך בנו בפטריון"
                    target="_blank" rel="noopener">
                    <img alt="לתמוך בנו בפטריון"
                        src="https://static.wixstatic.com/media/414bba_8c8c95d099d34ffeaf0a2750255613f9~mv2.png/v1/fill/w_30,h_30,al_c,q_85,usm_0.66_1.00_0.01/414bba_8c8c95d099d34ffeaf0a2750255613f9~mv2.webp" />
                </a>
                <a href="http://wearefree.tv/tag/en" class="lang_url">EN</a>
            </div>
        </div>

    </nav>
</template>

<script lang="js">

  export default  {
    name: 'home',
    props: {},
    beforeMount() {
      this.fetchNav();
    },
    mounted() {
       console.debug('nav:', this.$store);
    },
    data() {
      return {
        nav:[],
        pages:[]
      }
    },
    computed: {

    },
    methods: {

      async fetchNav() {
                console.log('pages: ', this.pages);

                let api = `https://www.wearefree.tv/ghost/api/v3/content/pages/?key=86ada218ec30f07f1f44985d57`;

                fetch(api, {cache: "force-cache"})
                    .then(response => response.json())
                    .then(data=> {
                        console.log(data);

                        this.pages = data.pages.filter(p=> p.slug.includes('-en'));
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

  nav .nav-links a {
    text-align: left;
  }

  .site-nav-main {
      position: fixed;
      background: #0a0b0c;
      top: 0;
      right: 0;
      left: 0;
      z-index: 1000;
      height: 64px;
  }

  .en .site-nav-main{
      justify-content: center;

      align-items: center;
      display: flex;
  }
  .en .site-nav-main a{
      color: #fff;
  }

  nav input {
      display: none;
  }

  nav span {
      display: none;
  }

  nav .inner {
      margin: 0 auto;
      max-width: 1000px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;
  }

  nav a.lang_url {
      line-height: 1.6em;
      border: 1px solid #fff;
      padding: 10px;
      color: #fff;
      font-size: 12px;

  }

  /******************************** NAV LEFT SIDE ***************************************/
  .site-nav-left {
      display: flex;
      align-items: flex-start;
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

  .site-nav-left div a {
      padding: 12px;
      color: #fff;
      opacity: 0.8;
      transition: opacity 0.35s ease-in-out;
      font-size: 15px;
      font-weight: 800;
  }

  /******************************** NAV RIGHT SIDE ***************************************/


  .site-nav-right {
      display: flex;
      align-items: center;
  }

  .site-nav-right > a {
      padding: 0 10px;
      color: #fff;
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
      nav .inner {
          position: absolute;
          top: 64px;
          left: -100%;
          flex-direction: column;
          width: inherit;
          background: #0a0b0c;
          height: calc(100vh - 100px);
          padding: 10px;
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

      .en .site-nav-logo.mobile img {
          top: 0;
      }

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
          height: calc(100vh - 80px);
      }
  }
</style>