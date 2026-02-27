<template>
    <div>
        <Map></Map>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Map from "./Map.vue";

@Component({
    components: {
        Map,
    },
})
export default class DroneInfo extends Vue {}
</script>
