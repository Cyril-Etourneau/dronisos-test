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
/**
 * Drone info view.
 *
 * Displays a status filter and a map with filtered drones.
 * Periodically refreshes the drone list via the Vuex store.
 */
export default class DroneInfo extends Vue {
    /**
     * Refresh interval ID (ms) or null when inactive.
     */
    private droneInterval: number | null = null;
    /**
     * Selected statuses used to filter displayed drones.
     */
    private filterStatus: string[] = [];

    /**
     * Drones from the Vuex store.
     *
     * @returns The current list of drones from the Vuex store.
     */
    protected get drones(): Drone[] {
        return store.state.drones;
    }

    /**
     * Drones filtered by the selected statuses.
     *
     * - If no status is selected, returns all drones.
     * - Otherwise, returns only drones whose status is selected.
     *
     * @returns The filtered list of drones.
     */
    protected get filteredDrones(): Drone[] {
        if (this.filterStatus.length === 0) {
            return this.drones;
        }

        return this.drones.filter((drone) => this.filterStatus.includes(drone.status));
    }

    /**
     * Available statuses for the filter (from the DroneStatus enum).
     *
     * @returns DroneStatus values as strings.
     */
    protected get statuses(): string[] {
        return Object.values(DroneStatus);
    }

    /**
     * On mount:
     * - triggers an initial fetch of drones
     * - starts a 5s interval to refresh drones periodically
     */
    mounted() {
        store.dispatch("fetchDrones");

        this.droneInterval = window.setInterval(() => {
            store.dispatch("fetchDrones");
        }, 5000);
    }

    /**
     * Before destroy:
     * - clears the refresh interval if it exists
     */
    beforeDestroy() {
        if (this.droneInterval) {
            clearInterval(this.droneInterval);
        }
    }
}
</script>
