<template>
    <LMap :zoom="5" :center="[4, 8]" style="height: 100vh; width: 100%">
        <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <DroneMarker v-for="drone in drones" :key="drone.name" :drone="drone" />
    </LMap>
</template>

<script lang="ts">
import store from "@/store";
import { Component, Vue } from "vue-property-decorator";
import { LMap, LTileLayer, LMarker, LPopup } from "vue2-leaflet";
import DroneMarker from "./DroneMarker.vue";

@Component({
    components: {
        DroneMarker,
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
    },
})
export default class Map extends Vue {
    private droneInterval: number | null = null;

    protected get drones() {
        return store.state.drones;
    }

    mounted() {
        // Fetch drones immediately
        store.dispatch("fetchDrones");

        // Then fetch every 5 seconds
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
