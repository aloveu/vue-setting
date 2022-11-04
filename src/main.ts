import '@/assets/scss/styles.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import '@/registerServiceWorker';
import { router } from '@/router';
// primeVue
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import ToastService from 'primevue/toastservice';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

// dayjs
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);
dayjs.extend(duration);

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.directive('focus', {
    // When the bound element is mounted into the DOM...
    mounted(el) {
        // Focus the element
        el.focus();
    },
});

app.mount('#app');

// component 전역 등록
app.component('InputText', InputText);
app.component('Button', Button);
