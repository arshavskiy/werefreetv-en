<template>
  <!-- <Nav /> -->
  <section class="register">
    <h2>{{getTitle}}</h2>
    <div class="AW-Form-1679204634"></div>
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
  },
  mounted(data) {

    console.log('mounted: ',data);

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//forms.aweber.com/form/34/1679204634.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, "script", "aweber-wjs-ux2mk7xrx"));

  },
  computed: {
    getTitle () {
      return this.$store.getters.getData.title;
    }
  },
  watch: {
  },
  methods: {

  },

}
</script>

<style>

  main{
    min-height: 77vh;
  }

  .register iframe{
    height: 500px;
  }
</style>