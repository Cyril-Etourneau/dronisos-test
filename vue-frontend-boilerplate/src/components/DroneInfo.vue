<template>
    <v-row class="d-flex pt-6 pb-6">
        <v-select
            v-model="filterStatus"
            :items="statuses"
            label="Filter by status"
            multiple
            chips
            solo
            prepend-inner-icon="mdi-filter-variant"
            :menu-props="{ offsetY: true, maxHeight: 300, zIndex: 2000 }"
        />
        <Map :drones="filteredDrones" />
    </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Map from "./Map.vue";
import store from "@/store";
import { DroneStatus } from "@/drones/status";
import { Drone } from "@/drones/schema";

@Component({
    components: {
        Map,
    },
})
export default class DroneInfo extends Vue {
    private droneInterval: number | null = null;
    private filterStatus: string[] = [];

    protected get drones(): Drone[] {
        return store.state.drones;
    }

    protected get filteredDrones(): Drone[] {
        if (this.filterStatus.length === 0) {
            return this.drones;
        }

        return this.drones.filter((drone) => this.filterStatus.includes(drone.status));
    }

    protected get statuses(): string[] {
        return [...Object.values(DroneStatus)];
    }

    mounted() {
        store.dispatch("fetchDrones");

        this.droneInterval = window.setInterval(() => {
            store.dispatch("fetchDrones");
        }, 5000);
    }

    beforeDestroy() {
        if (this.droneInterval) {
            clearInterval(this.droneInterval);
        }
    }
}
</script>
