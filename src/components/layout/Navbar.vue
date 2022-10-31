<template>
    <nav class="navbar">
        <ul class="navi">
            <li v-for="(menu, i) in menuList" :key="i">
                <RouterLink class="nav-link" active-class="active" :to="`/${menu.id}`">
                    {{ menu.label }}
                </RouterLink>
                <ul v-if="menu.subMenu?.length" class="sub-nav">
                    <li v-for="(submenu, j) in menu.subMenu" :key="j">
                        <RouterLink active-class="active" :to="`/${menu.id}/${submenu.id}`">
                            {{ submenu.label }}
                        </RouterLink>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
const menuList = [
    { id: 'brand', label: 'Brand' },
    { id: 'series', label: 'Series' },
    { id: 'tournament', label: 'Tournament' },
    { id: 'venue', label: 'Venue' },
    { id: 'staking', label: 'Staking' },
    {
        id: 'payment',
        label: 'Payment',
        subMenu: [
            { id: 'psp-balance', label: 'PSP Balance' },
            { id: 'withdrawal-list', label: 'Pending Withdrawal' },
            { id: 'payment-history-list', label: 'Payment History' },
            { id: 'refund-history-list', label: 'Refund History' },
        ],
    },
];
</script>

<style scoped lang="scss">
.navbar {
    display: block;
    position: fixed;
    top: 80px;
    bottom: 0;
    left: 0;
    width: 200px;
    background-color: #202124;
    z-index: 11;
    .navi {
        height: 100%;
        padding-top: 10px;
        overflow-y: auto;
        > li {
            a {
                position: relative;
                display: block;
                padding: 15px 15px 15px 25px;
                color: #ced4da;
                font-size: 1.1em;
                &.active {
                    color: #fff;
                    font-weight: bold;
                    cursor: default;
                    &::before {
                        content: '';
                        position: absolute;
                        width: 6px;
                        height: 100%;
                        background-color: #bc0000;
                        top: 0;
                        left: 0;
                    }
                    &.sub {
                        &::before {
                            display: none;
                        }
                    }
                }
                &:hover:not(.active) {
                    background-color: #2f3134;
                }
            }
            > .sub-nav {
                > li {
                    > a {
                        padding: 7px 10px 7px 45px;
                        font-size: 1em;
                    }
                }
            }
        }
    }
}
</style>
