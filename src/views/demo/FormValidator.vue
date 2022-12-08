<template>
    <h2 class="title">Form Validator</h2>
    <div class="content">
        <q-form class="form-group" ref="form" @submit="handleSubmit">
            <ul>
                <li>name : <q-input v-model="name" type="text" lazy-rules :rules="[(val) => !!val]" outlined /></li>
                <li>
                    email :
                    <q-input type="text" v-model="email" lazy-rules outlined :rules="[(val) => !!val]" :error="!isEmailValidComputed" error-message="이메일 형식 맞춰야" />
                </li>
                <li>
                    phoneNumber :
                    <q-input
                        type="number"
                        v-model="phoneNumber"
                        lazy-rules
                        :rules="[(val) => !!val, (val) => (val !== null && val !== '') || '입력!', (val) => val.length === 11 || '11자까지..']"
                        outlined
                        v-digit-only
                        maxlength="11"
                    />
                </li>
            </ul>

            <q-btn :disable="!isFormisValid" label="Submit" type="submit" color="primary" />
        </q-form>
    </div>
</template>

<script setup lang="ts">
import { onUpdated, ref, Ref, computed } from 'vue';

const form = ref(null);
const name: Ref<string> = ref(null);
const email: Ref<string> = ref(null);
const phoneNumber: Ref<number> = ref(null);

function handleSubmit() {
    console.log(`name: ${name.value}, email: ${email.value}, phone: ${phoneNumber.value}`);
}

// test
const isNameValidComputed = computed(() => {
    return !!name.value;
});
const isEmailValidComputed = computed(() => {
    return !email.value || /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email.value);
});
const isPhoneNumberValidComputed = computed(() => {
    return !!phoneNumber.value && phoneNumber?.value?.toString().length === 11;
});

const isFormisValid = computed(() => {
    return isNameValidComputed.value && isEmailValidComputed.value && isPhoneNumberValidComputed.value;
});
</script>

<style scoped lang="scss"></style>
