<template>
  <!-- <Nav /> -->
  <section class="register">
    <h2>{{getTitle}}</h2>
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

  },
  computed: {
    getDataFromNav () {
      return this.$store.getters.getData.html;
    },
    getTitle () {
      return this.$store.getters.getData.title;
    }
  },
  watch: {
    getDataFromNav (newNavData, old) {
      // Our fancy notification (2).
      this.page = newNavData;
      console.log(`We have ${old} state now, yay!`)
      console.log(`We have ${newNavData} state now, yay!`)
    }
  },
  methods: {

  },

}
</script>