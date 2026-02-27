<template>
    <LMarker :lat-lng="[drone.position[1], drone.position[0]]" :icon="vuetifyMarker">
        <LPopup>
            <div>
                <strong>{{ drone.name }}</strong
                ><br />
                Status: <span :style="{ color: warningStatus }">{{ drone.status }}</span
                ><br />
                Position:<br />
                {{ drone.position[0] }}<br />
                {{ drone.position[1] }}<br />
                {{ drone.position[2] }}<br />
            </div>
        </LPopup>
    </LMarker>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LIcon, LMarker, LPopup } from "vue2-leaflet";
import L from "leaflet";
import { Drone } from "@/drones/schema";

@Component({
    components: {
        LIcon,
        LMarker,
        LPopup,
    },
})
/**
 * Marker component for a single drone on a Leaflet map.
 *
 * Renders:
 * - A custom Vuetify-styled circular marker colored by status severity
 * - A popup showing drone name, status, and 3D position
 *
 * Coordinates:
 * - Uses [lat, lng] = [position[1], position[0]] for the marker, position[2] as altitude (display only).
 */
export default class DroneMarker extends Vue {
    /**
     * Drone data to display.
     *
     * - name: unique identifier
     * - position: [lng, lat, alt]
     * - status: status code string
     */
    @Prop({ required: true })
    private drone!: Drone;

    /**
     * Color associated with the drone status.
     *
     * Mapping:
     * - Error: LOST_LINK, MOTOR_KO -> "red"
     * - Warning: BAD_CONFIG, LOW_BATTERY -> "orange"
     * - Default: "black"
     */
    protected get warningStatus(): string {
        const status = this.drone.status;
        const errorStatuses = ["LOST_LINK", "MOTOR_KO"];
        const warningStatuses = ["BAD_CONFIG", "LOW_BATTERY"];

        if (errorStatuses.includes(status)) {
            return "red";
        }

        if (warningStatuses.includes(status)) {
            return "orange";
        }

        return "black";
    }

    /**
     * Leaflet divIcon configured to look like a Vuetify mdi-circle icon.
     *
     * - Color bound to warningStatus
     * - iconSize, iconAnchor, popupAnchor tuned for centered small dots
     */
    protected get vuetifyMarker() {
        const size = 16;

        return L.divIcon({
            className: "vuetify-marker",
            html: `<i class="v-icon notranslate mdi mdi-circle theme--light" style="color: ${this.warningStatus}; font-size: ${size}px; line-height: ${size}px;"/>`,
            iconSize: [size, size],
            iconAnchor: [size / 2, size / 2],
            popupAnchor: [0, 0],
        });
    }
}
</script>

<style scoped>
.vuetify-marker .v-icon {
    font-size: 24px;
}
</style>
