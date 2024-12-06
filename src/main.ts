import './assets/main.scss'
import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import Ripple from 'primevue/ripple';
import KeyFilter from 'primevue/keyfilter';

import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(ToastService);
app.directive('ripple', Ripple);
app.directive('keyfilter', KeyFilter);

app.use(createPinia())
app.use(router)

app.mount('#app')
