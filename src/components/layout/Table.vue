<template>
    <div class="table-wrapper">
        <table class="q-table">
            <thead>
                <slot name="header"></slot>
            </thead>
            <tbody>
                <slot name="body"></slot>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss">
.q-table {
    border: 1px solid $gray-3;
    overflow: hidden;
    border-radius: 5px;
    thead {
        th {
            background-color: #e9e9e9;
            color: #262626;
            font-weight: bold;
            border-bottom-width: 1px;
            border-color: $gray-3;
            font-size: 14px;
            &:not(:last-child) {
                border-right-width: 1px;
            }
        }
    }
    tbody {
        tr {
            border-bottom: 1px solid $gray-3;
            &:not(:last-child) {
                th,
                td {
                    border-bottom-width: 1px;
                }
            }
        }
        th,
        td {
            border-color: $gray-3;
            &:not(:last-child) {
                border-right-width: 1px;
                border-color: $gray-3;
            }
            font-size: 14px;
            &.center {
                text-align: center;
            }
            &.right {
                text-align: right;
            }
        }
        th {
            color: #262626;
            font-weight: bold;
            background-color: #e9e9e9;
        }
    }
}
.q-table .q-checkbox {
    display: flex;
    justify-content: center;
}
.my-sticky-header-table,
.my-sticky-header-column-table {
    display: block;
    overflow: scroll;
    max-height: 40vh;
}
.my-sticky-header-column-table thead tr th,
.my-sticky-header-table thead tr th {
    position: sticky;
    top: 0;
    background-color: #ff9800;
    color: #fff;
    z-index: 10;
}
.my-sticky-header-column-table,
.my-sticky-column-table {
    display: block;
    overflow: scroll;
    max-width: 500px;
}
.my-sticky-header-column-table th:first-child,
.my-sticky-header-column-table td:first-child,
.my-sticky-column-table th:first-child,
.my-sticky-column-table td:first-child {
    position: sticky;
    left: 0;
    background-color: #ff9800;
    color: #fff;
    z-index: 1;
}
</style>
