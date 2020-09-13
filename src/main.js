import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './utils/element'
import './styles/base.scss'
import './utils/request'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')