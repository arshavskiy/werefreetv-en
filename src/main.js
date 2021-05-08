import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


const vm = createApp(App).use(router)
// app.use(router);

vm.mount('#app');