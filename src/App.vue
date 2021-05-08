<template>
  <Nav/>
  <router-view/>
</template>

<script lang="js">

  import Nav from './components/Nav.vue'

  export default  {
    name: 'app',
    components: {
      Nav
    },
    props: {},
    mounted() {

    },
    data() {
      return {
        nav:[],
      }
    },
    methods: {      
    }
  }
    
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position:relative; 
  top: 64px;
  max-width: 1000px;
  margin: 0 auto;
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
</style>
