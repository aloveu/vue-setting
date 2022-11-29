<template>
    <div class="header">
        <h1 class="heading-title">
            <span class="logo"><img src="@/assets/img/logo.png" alt="logo" /></span>
            <em class="admin-title"> Admin {{ env }}</em>
        </h1>

        <div class="header-admin" v-if="false">
            <span class="admin-name"> <i class="pi pi-angle-down"></i></span>
            <button type="button" class="button-menu" @click="onToggleSideMenu">
                <i class="pi {{isSideMenuPanelToggle ? 'pi-times' : 'pi-bars'}}"></i>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const env = process.env.NODE_ENV;
console.log(process.env);

function onToggleSideMenu() {
    console.log('토글');
}
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 80px;
    background-color: #bc0100;
    padding: 5px 0;
    color: #fff;
    left: 0;
    top: 0;
    z-index: 100;
    .heading-title {
        padding-left: 10px;
        font-size: 1.8em;
        .logo {
            display: inline-flex;
            align-items: center;
            padding-right: 10px;
            vertical-align: middle;
            img {
                height: 40px;
            }
        }
        .admin-title {
            padding-left: 10px;
            border-left: 1px solid rgba(#fff, 0.3);
            vertical-align: middle;
            font-size: 0.85em;
            font-family: 'RobotoBlack', sans-serif;
            > strong {
                font-family: 'RobotoBlack', sans-serif;
            }
        }
    }
    .header-admin {
        padding-right: 15px;
        .admin-name {
            display: block;
            cursor: pointer;
            padding: 10px;
        }
        .pi {
            vertical-align: middle;
        }
        .button-menu {
            display: none;
        }
    }
}
</style>
