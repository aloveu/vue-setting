<template>
    <h2 class="title">Table</h2>
    <div class="content">
        <p>퀘이사에도 table component(<a href="https://quasar.dev/vue-components/table" target="_blank" class="link">https://quasar.dev/vue-components/table</a>)를 제공해주고 있으나 더 복잡</p>

        <table class="q-table">
            <thead>
                <tr>
                    <th><q-checkbox v-model="selectedAll" @update:model-value="toggleSelectedAll" /></th>
                    <th>Venue ID</th>
                    <th>Image</th>
                    <th>Venue Name</th>
                    <th>URL</th>
                    <th>Address</th>
                    <th>Time Zone</th>
                    <th>Event</th>
                    <th>Active Staking</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(venue, i) in venueList" :key="i">
                    <td><q-checkbox v-model="venue.selected" /></td>
                    <td>{{ venue.venueId }}</td>
                    <td>
                        {{ venue.venueImageUrl }}
                    </td>
                    <td>{{ venue.venueName }}</td>
                    <td>{{ venue.linkUrl }}</td>
                    <td>{{ venue.venueAddress }}</td>
                    <td>{{ venueTimezone[venue.utcTimeZoneNumber] }}</td>
                    <td>{{ venue.tournamentEventCount }}</td>
                    <td>{{ venue.stakeCount }}</td>
                    <td><button>Edit</button></td>
                </tr>
            </tbody>
        </table>
        <Loading v-if="isListLoading" />
        <PageNavigation :pageOptions="pageOptions" :isListLoading="isListLoading" @listChange="onListChangeRequested($event)" />
    </div>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { DTO } from '@/models';
import commonService from '@/services/common.service';
import Loading from '@/components/Loading.vue';
import PageNavigation from '@/components/PageNavigation.vue';

const isListLoading = ref(true);
const pageOptions = ref({
    currentPage: 1,
    pageSize: 10,
} as DTO.Common.PageOptions);
const venueTimezone = DTO.Enums.TimezoneEnums;
const selectedAll = ref(false);
const venueList: Ref<Array<DTO.Venue.VenueInfo>> = ref([]);

onMounted(() => {
    getVenueList(1);
});

async function getVenueList(page) {
    try {
        isListLoading.value = true;
        const res = await commonService.getVenueList();
        venueList.value = res.venueInfoList.map((venue) => {
            venue.selected = false;
            return venue;
        });
        pageOptions.value.totalCount = res.totalCount;
    } catch (e) {
        console.log(e);
    } finally {
        // loading을 보기 위한 임시 setTimeout
        setTimeout(() => {
            isListLoading.value = false;
        }, 1000);
    }
}

function toggleSelectedAll(toggle: boolean) {
    venueList.value.forEach((venue) => {
        venue.selected = toggle;
    });
}

async function onListChangeRequested(options: DTO.Common.PageOptions) {
    pageOptions.value = options;

    await getVenueList(pageOptions.value.currentPage);
}
</script>

<style scoped lang="scss"></style>
