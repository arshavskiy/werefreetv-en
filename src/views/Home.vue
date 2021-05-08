<template>
  <div class="home">
    <!-- <Nav/> -->
    <Feed/>
  </div>
</template>

<script>
// @ is an alias to /src
import Feed from '../components/Feed.vue'
// import Nav from '../components/Nav.vue'

export default {
  name: 'Home',
  components: {
    Feed,
    // Nav
  }
}
</script>
