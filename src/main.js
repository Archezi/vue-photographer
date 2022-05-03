import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { projectAuth } from './firebase/config'

import TheHeader from './components/UI/TheHeader.vue'

let app = createApp(App)

app.component('the-header', TheHeader)

app.use(router)

app.mount('#app')
