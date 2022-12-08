<template>
    <h2 class="title">File Upload</h2>
    <div class="content">
        기본 퀘이사 컴포넌트에서 가져오면 됨.
        <a href="https://quasar.dev/vue-components/uploader#handling-upload" target="_blank" class="link">https://quasar.dev/vue-components/uploader#handling-upload</a>
        <br />
        <br />

        <q-uploader :factory="factory" @factory-failed="onFactoryFail" url="http://localhost:6500" label="Venue Img" style="max-width: 300px" />

        업로드한 파일 경로 : {{ fileName }}
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import commonService from '@/services/common.service';

const fileName = ref();

const uploadFile = async (file) => {
    console.log(file);
    try {
        const formData = new FormData();
        formData.append('file', file[0], file[0].name);

        const res = await commonService.fileUpload(formData);
        fileName.value = res.imageUrl;
    } catch (err) {
        console.log(err.message);
    }
};

async function factory(files) {
    console.log('files[0].name:', files[0].name);
    await uploadFile(files[0]);
}

function onFactoryFail(err, files) {
    console.log('factoryFail error:', err);
    console.log('factoryFail files:', files);
}
</script>

<style scoped lang="scss"></style>
