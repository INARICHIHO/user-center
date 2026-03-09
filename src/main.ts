import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';
import * as Icons from '@ant-design/icons-vue'
import 'ant-design-vue/dist/reset.css';
import { createI18n } from 'vue-i18n'
import en from './locales/en'
import zh from './locales/zh'
import ja from './locales/ja'
import './styles/theme-light.css'
import './styles/theme-dark.css'
import './styles/theme-blue.css'
import './styles/global.css'

const app = createApp(App)
const pinia = createPinia()
const i18n = createI18n({
  legacy: false,          // 使用 composition API
  locale: 'zh',           // 默认语言
  fallbackLocale: 'en',   // 回退语言
  messages: { en, zh , ja},
})

Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})

async function bootstrap() {
/*   if (import.meta.env.DEV) {
    await import('./mock');  // ✅ 现在在 async 函数内部，合法
    console.log('✅ Mock 加载完成');
  }
 */
  app.use(router);
  app.use(Antd);
  app.use(pinia);
  app.use(i18n)
  app.mount('#app');
}

bootstrap();