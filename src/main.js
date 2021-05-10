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
    },
    mutations: {
        minusOne(state) {
            state.count--
        },
        pushData (state, n) {
            state.route.html = n;
        }

    },
    getters: {
        getData(state) {
            let route = window.location.pathname.split('/')[1];
            let temp = state.route.html;
            if (state.route.html.length) {
                temp = state.route.html.filter(n => n.slug.includes(route)).pop().html;
            }
            console.log('getters state', state);
            console.log('getters getData', temp);
            return temp
        }
    }
})

vm.use(store);
// app.use(router);

vm.mount('#app');