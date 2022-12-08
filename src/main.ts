import '@/assets/scss/styles.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import '@/registerServiceWorker';
import { router } from '@/router';
import { focus, digitOnly } from '@/directives';
import Helper from '@/helper';
import { createPersistedState } from 'pinia-plugin-persistedstate';

// quasar
import { Quasar } from 'quasar';
import quasarUserOptions from '@/quasar-user-options';

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

const app = createApp(App).use(Quasar, quasarUserOptions);
const pinia = createPinia();
pinia.use(createPersistedState());
app.use(pinia);
app.use(router);

app.mount('#app');

// directive 등록
app.directive('focus', focus);
app.directive('digitOnly', digitOnly);

// filter 등록
app.config.globalProperties.$filters = Helper.filters;
