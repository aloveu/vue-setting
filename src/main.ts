import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import App from '@/App.vue';
import { router } from '@/router';
import { focus, digitOnly, textOnly } from '@/directives';
import { Filters } from '@/helper';
import { createPersistedState } from 'pinia-plugin-persistedstate';

// quasar
import { Quasar } from 'quasar';
import quasarUserOptions from '@/quasar-user-options';

// datepicker
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

// 스타일을 다른 라이브러리 아래쪽에
import '@/assets/scss/styles.scss';

// dayjs
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isoWeek from 'dayjs/plugin/isoWeek';
import isBetween from 'dayjs/plugin/isBetween';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isoWeek);
dayjs.extend(isBetween);
dayjs.extend(duration);

const pinia = createPinia();
pinia.use(createPersistedState());
pinia.use(({ store }) => {
    store.router = markRaw(router);
});

const app = createApp(App).use(Quasar, quasarUserOptions);
app.use(pinia);
app.use(router);

app.component('Datepicker', Datepicker);
app.mount('#app');

// directive 등록
app.directive('focus', focus);
app.directive('digitOnly', digitOnly);
app.directive('textOnly', textOnly);

// filter 등록
app.config.globalProperties.$filters = Filters;
