<template>
    <div class="login">
        <q-card style="border-radius: 6px">
            <q-card-section>
                <div class="text-h5">Login</div>
            </q-card-section>
            <q-separator />

            <q-card-section>
                <q-input v-model="email" label="Username" v-focus outlined lazy-rules :rules="[isEmail]">
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                </q-input>

                <q-input v-model="password" @keydown.enter="handleLogin" type="password" label="Password" outlined>
                    <template v-slot:prepend>
                        <q-icon name="lock" />
                    </template>
                </q-input>
            </q-card-section>
            <q-card-actions vertical>
                <q-btn @click="handleLogin" :loading="isLoading" color="primary" icon="login" label="LOGIN">
                    <template v-slot:loading> <q-spinner-facebook /> </template
                ></q-btn>
            </q-card-actions>
        </q-card>
    </div>
</template>

<script setup lang="ts">
// import
import { onBeforeMount, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import { useQuasar } from 'quasar';
import authService from '@/services/auth.service';

// util
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const $q = useQuasar();

// data
const isLoading = ref(false);
const email = ref('');
const password = ref('');

// mount 전 hook
onBeforeMount(() => {
    if (authStore.isLogin) {
        const refUrl = route.query?.refUrl;
        router.replace(refUrl ? `${refUrl}` : '/report');
    }
});

// validator
function isEmail(val) {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return (val.length > 0 && emailPattern.test(val)) || 'invalid email format.';
}

// data handle
const handleLogin = async () => {
    try {
        isLoading.value = true;
        // auth login api 호출
        const res = await authService.signIn({ adminEmail: email.value, password: password.value });

        if (email.value === '1' && password.value === '1') {
            authStore.registerAdmin(res);
        } else {
            throw Error;
        }
    } catch (e) {
        console.log(e);
        $q.notify({
            color: 'negative',
            message: 'Login Failed!',
            icon: 'report_problem',
            position: 'bottom-right',
            timeout: 2000,
            actions: [
                {
                    icon: 'close',
                    color: 'white',
                },
            ],
            // severity: 'error',
            // summary: 'Fail',
            // detail: 'Login Failed!',
            // life: 2000,
        });
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped lang="scss">
.login {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 500px;
    .p-inputgroup {
        height: 50px;
        margin-bottom: 5px;
    }
}
</style>
