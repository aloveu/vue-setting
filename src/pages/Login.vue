<template>
    <div class="login">
        <q-card style="border-radius: 6px">
            <q-card-section>
                <div class="text-h5">Login</div>
            </q-card-section>
            <q-separator />

            <q-card-section>
                <q-input v-model="email" label="Username" v-focus outlined lazy-rules :rules="[(val) => !!val]" :error="!isEmailValid" autocomplete="off" error-message="invalid email format.">
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                </q-input>

                <q-input v-model="password" @keydown.enter="requestSignIn" type="password" label="Password" autocomplete="off" outlined>
                    <template v-slot:prepend>
                        <q-icon name="lock" />
                    </template>
                </q-input>
            </q-card-section>
            <q-card-actions vertical>
                <q-btn :disable="!isLoginFormValid" @click="requestSignIn" :loading="isLoading" color="primary" icon="login" label="LOGIN">
                    <template v-slot:loading>
                        <q-spinner-facebook />
                    </template>
                </q-btn>
            </q-card-actions>
        </q-card>
    </div>
</template>

<script setup lang="ts">
// import
import { computed, onBeforeMount, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/store/auth.store';
import { ToastMessage, Validator } from '@/helper';

// util
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// data
const isLoading = ref<boolean>(false);
const email = ref<string>('test');
const password = ref<string>('1q2w3e4r');

// mount 전 hook
onBeforeMount(() => {
    // const refUrl = route.query?.refUrl;
    // router.replace(refUrl ? `${refUrl}` : '/main');
});

// validator
const isEmailValid = computed(() => {
    return !email.value || Validator.isEmail(email.value);
});

const isLoginFormValid = computed(() => {
    return isEmailValid.value && password.value;
});

// data handle
async function requestSignIn(returnVerifyCode) {
    try {
        isLoading.value = true;

        // auth login api 호출
        const params = {
            email: email.value,
            password: password.value,
            verificationCode: returnVerifyCode,
        };

        // const loginResponse = await authService.signIn(params);
        // authStore.registerInfo(loginResponse);
        router.push('/main');
    } catch (e) {
        console.error(e);
        ToastMessage.error('Login Failed!');
    } finally {
        isLoading.value = false;
    }
}
</script>

<style scoped lang="scss">
.login {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 500px;
    :deep {
        //.q-input .q-field__control {
        //    min-height: 56px;
        //    height: 56px;
        //}
        .q-field__control,
        .q-field__marginal {
            min-height: 56px;
            height: 56px;
        }
        .q-field__bottom {
            padding: 4px 0 0;
        }
        .q-card__section--vert {
            padding-bottom: 7px;
        }
    }
}
</style>
