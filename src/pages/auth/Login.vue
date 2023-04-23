<template>
    <div class="login">
        <q-card style="border-radius: 6px">
            <q-card-section>
                <div class="text-h5">Login</div>
                <p>PlayStage 관리자 페이지 오신걸 환영 합니다.</p>
            </q-card-section>
            <q-separator />

            <q-card-section>
                <q-input v-model="loginForm.adminId" label="ID" v-focus outlined lazy-rules autocomplete="off">
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                </q-input>

                <q-input v-model="loginForm.adminPwd" @keydown.enter="requestSignIn" type="password" label="Password" autocomplete="off" outlined>
                    <template v-slot:prepend>
                        <q-icon name="lock" />
                    </template>
                </q-input>
            </q-card-section>
            <q-card-actions vertical>
                <q-btn :disable="vuelidate.$invalid" @click="requestSignIn" :loading="isLoading" color="primary" icon="login" label="LOGIN">
                    <template v-slot:loading>
                        <q-spinner-facebook />
                    </template>
                </q-btn>
            </q-card-actions>
        </q-card>
    </div>

    <TwoFactorModal v-if="isShowPlayerInfo" v-model:isShowPlayerInfo="isShowPlayerInfo" :adminSeq="adminSeq" />
</template>

<script setup lang="ts">
// import
import { computed, nextTick, onBeforeMount, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ToastMessage, Validator } from '@/helper';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import authService from '@/services/auth.service';
import TwoFactorModal from '@/pages/auth/TwoFactorModal.vue';

// util
const router = useRouter();
const route = useRoute();

// data
const isLoading = ref<boolean>(false);
const loginForm = reactive({
    adminId: '',
    adminPwd: '',
});
const loginRules = computed(() => ({
    adminId: { required },
    adminPwd: { required },
}));
const vuelidate = useVuelidate(loginRules, loginForm);
const isShowPlayerInfo = ref<boolean>(false);
const adminSeq = ref<number>(null);

// data handle
async function requestSignIn() {
    try {
        isLoading.value = true;

        const res = await authService.signIn(loginForm);
        adminSeq.value = res.adminSeq;
        isShowPlayerInfo.value = true;
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
