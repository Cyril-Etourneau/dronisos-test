<template>
    <v-app>
        <v-app-bar app color="amber darken-1">
            <div class="d-flex align-center drone-info" @click="moveToPage('drone-info')">
                <v-img src="@/assets/logo.png" alt="Logo" contain max-width="32" class="mr-3" />
                <v-toolbar-title>Dronisos's drone tracking</v-toolbar-title>
            </div>

            <v-spacer />

            <v-btn icon @click="moveToPage('hello-world')">
                <v-icon>mdi-information</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main>
            <v-container class="px-4 px-sm-6">
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

/**
 * Root application component.
 *
 * - Renders the app bar with logo, title and an info button.
 * - Hosts the main container and the router view.
 */
@Component
export default class App extends Vue {
    /**
     * Navigate to a named route if not already on it.
     *
     * @param name - The target route name.
     * @remarks
     * Avoids redundant navigation by checking the current route name
     * before pushing to the router.
     * @example
     * this.moveToPage('drone-info');
     */
    protected moveToPage(name: string): void {
        if (this.$route.name !== name) {
            this.$router.push({ name });
        }
    }
}
</script>

<style>
.drone-info {
    cursor: pointer;
}
</style>
