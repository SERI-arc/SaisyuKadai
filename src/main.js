import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify' // vuetifyのインポート
import '@mdi/font/css/materialdesignicons.css' // mdiアイコンのCSS読み込み
import axios from "axios"

const app = createApp(App)

axios.defaults.withCredentials = true

app.use(createPinia())
app.use(router)
app.use(vuetify) // アプリへの定義追加

app.mount('#app')
