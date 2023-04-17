import 'quasar/dist/quasar.sass';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/material-symbols-outlined/material-symbols-outlined.css';
import { Notify, Dialog } from 'quasar';

// To be used on app.use(Quasar, { ... })
export default {
    config: {
        notify: {},
    },
    plugins: {
        Notify,
        Dialog,
    },
    extras: [],
    supportTS: {
        tsCheckerConfig: {
            eslint: {
                enabled: true,
                files: './src/**/*.{ts,tsx,js,jsx,vue}',
            },
        },
    },
};
