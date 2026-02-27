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

@Component({
    components: {
        LIcon,
        LMarker,
        LPopup,
    },
})
export default class DroneMarker extends Vue {
    @Prop({ required: true })
    private drone!: {
        name: string;
        position: [number, number, number];
        status: string;
    };

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
