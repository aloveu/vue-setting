// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
// import 'primevue/resources/themes/saga-blue/theme.css';
// import 'primevue/resources/primevue.min.css';
// import 'primeicons/primeicons.css';
import '@/assets/scss/styles.scss';
// import PrimeVue from 'primevue/config';
// import BootstrapVue3 from 'bootstrap-vue-3';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import '@/registerServiceWorker';
import router from '@/router';
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
app.use(router);
app.use(createPinia());
app.mount('#app');
