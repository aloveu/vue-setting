<template>
    <div>
        <Header />
        <article class="contents">
            <Navbar />
            <div class="content-container">
                <BreadCrumb />
                <section class="content">
                    <router-view />
                    <Footer />
                </section>
            </div>
        </article>
    </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar.vue';
import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import BreadCrumb from '@/components/layout/BreadCrumb.vue';

export default {
    components: { Footer, Header, Navbar, BreadCrumb },
};
</script>

<style scoped lang="scss">
.contents {
    padding-top: 80px;
    .content-container {
        position: relative;
        float: right;
        width: calc(100% - 200px);
        height: 100%;
        padding: 30px;
        .content {
            border-radius: 10px;
            background-color: #f6f8f9;
        }
    }
}
</style>
