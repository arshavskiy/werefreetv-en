<template lang="html">

    <transition name="fade">
        <section id="loader" v-show="notLoaded">

            <div class="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

        </section>
    </transition>


</template>

<script lang="js">

export default {
    name: 'loader',
    props: {},
    beforeMount() {
    },
    mounted() {
    },
    data() {
        return {
            notLoaded: true
        }
    },
    computed: {
        loaded() {
            return this.$store.getters.loaded;
        },
    },
    watch: {
        loaded(newNavData) {
            this.notLoaded = !newNavData;
        }
    },
    methods: {},
}
</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
    opacity: 0;
}

#loader {
    width: 100%;
    height: calc(100vh - 80px);
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}

.lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #101010;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #101010 transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
}

@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>