import {
    createApp
} from 'vue'
import {
    createStore
} from 'vuex'
import App from './App.vue'
import router from './router'

const vm = createApp(App).use(router)

const store = createStore({
    state: {
        route: {
            html: {}
        },
        loaded: false
    },
    mutations: {
        minusOne(state) {
            state.count--
        },
        pushData (state, n) {
            state.route.html = n;
        },
        pageLoaded (state){
            state.loaded = true;
        }

    },
    getters: {
        getData(state) {
            let route = window.location.pathname.split('/')[1];
            let page = state.route.html;
            if (state.route.html.length) {
                page = state.route.html.filter(n => n.slug.includes(route)).pop()
            }
            console.log('getters state', state);
            console.log('getters getData', page);
            return {
                html: page.html,
                title: page.title
            }
        },
        loaded(state){
            return state.loaded;
        }
    }
})

vm.use(store);
// app.use(router);

vm.mount('#app');