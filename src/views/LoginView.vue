<template>
    <div class="login">
        <Card style="border-radius: 6px">
            <template #title>Login</template>
            <template #content>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                    <InputText v-model="email" v-focus placeholder="Username" />
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-lock"></i>
                    </span>
                    <Password v-model="password" @keydown.enter="handleLogin" :feedback="false" placeholder="Password" />
                </div>
            </template>
            <template #footer>
                <Button @click="handleLogin" icon="pi pi-sign-in" label="LOGIN"></Button>

                <Button @click="protoBufTest" label="protoBuf test"></Button>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
// import
import { onBeforeMount, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '@/store/auth';
import Password from 'primevue/password';
import Card from 'primevue/card';
import authService from '@/services/auth.service';

// util
const router = useRouter();
const route = useRoute();
const toast = useToast();
const authStore = useAuthStore();

// data
const email = ref('');
const password = ref('');

// mount 전 hook
onBeforeMount(() => {
    if (authStore.isLogin) {
        const refUrl = route.query?.refUrl;
        router.replace(refUrl ? `${refUrl}` : '/report');
    }
});

const protoBufTest = async () => {
    try {
        const res = await authService.protoSignIn({ adminEmail: email.value, password: password.value });
        console.log(res);
    } catch (e) {
        console.log(e);
    }
};

// data handle
const handleLogin = async () => {
    try {
        // auth login api 호출
        const res = await authService.signIn({ adminEmail: email.value, password: password.value });

        if (email.value === '1' && password.value === '1') {
            authStore.registerAdmin(res);
        } else {
            throw Error;
        }
    } catch (e) {
        console.log(e);
        toast.add({
            severity: 'error',
            summary: 'Fail',
            detail: 'Login Failed!',
            life: 2000,
        });
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
