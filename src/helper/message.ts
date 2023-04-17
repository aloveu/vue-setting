import { Notify, Dialog } from 'quasar';

export const ToastMessage = {
    success(message: string) {
        Notify.create({
            message,
            type: 'positive',
            position: 'top-right',
            timeout: 1000,
            actions: [
                {
                    icon: 'close',
                    color: 'white',
                },
            ],
        });
    },
    error(message: string) {
        Notify.create({
            message,
            type: 'negative',
            position: 'top-right',
            timeout: 1000,
            actions: [
                {
                    icon: 'close',
                    color: 'white',
                },
            ],
        });
    },
    warning(message: string) {
        Notify.create({
            message,
            type: 'negative',
            position: 'top-right',
            timeout: 1000,
            color: 'yellow-5',
            textColor: 'black',
            icon: 'warning',
        });
    },
};

export const ConfirmMessage = ({
    title = 'Confirm',
    message = 'Are you sure?',
    ok = 'confirm',
    cancel = 'cancel',
    isPersistent = true,
    html = true,
    color = 'negative',
    icon = null,
    prompt = null,
}) => {
    return new Promise((resolve, reject) => {
        const options = { title, message, ok: { label: ok, color: 'primary', unelevated: true }, cancel: { label: cancel, color: 'gray-4', unelevated: true }, persistent: isPersistent, html, color };
        if (prompt) {
            options['prompt'] = { outlined: true, dense: true, ...prompt };
        }

        if (icon) {
            options.message = `<q-card-section class="row items-center no-wrap">
                <i class="q-icon text-primary material-icons" style="font-size: 20px">${icon}</i>
                <span class="q-ml-sm">${message}</span>
            </q-card-section>`;
        }

        Dialog.create(options).onOk(resolve).onCancel(reject);
    });
};

export const AlertMessage = ({ title = 'Alert', message = '', html = true }) => {
    Dialog.create({
        title,
        message,
        html,
    }).onOk(() => {
        // console.log('OK')
    });
};
