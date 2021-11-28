<template>
    <div class="home">
        <Feed/>
    </div>
</template>

<script>
// @ is an alias to /src
import Feed from '../components/Feed.vue'

export default {
    name: 'Home',
    components: {
        Feed,
    },
    mounted(){
        document.querySelector('.site-nav-main>input').checked = false;
    }
}
</script>
