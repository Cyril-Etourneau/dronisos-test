import Vue from "vue";
import Vuex from "vuex";
import { Drone, validateDrones } from "@/drones/schema";
import { getBackendUrl } from "@/utils/server";

Vue.use(Vuex);

/**
 * Root Vuex state for the application.
 */
type StoreState = {
    drones: Drone[];
};

/**
 * Singleton Vuex store instance managing drones state.
 */
const store = new Vuex.Store<StoreState>({
    state: {
        drones: [],
    },
    getters: {
        /**
         * Get the current list of drones from the store.
         *
         * @param state - Current store state
         * @returns The array of drones
         */
        getDrones: (state) => state.drones,
    },
    mutations: {
        /**
         * Replace the drones list in state.
         *
         * @param state - Current store state
         * @param drones - Validated drones to set
         */
        setDrones(state, drones): void {
            state.drones = drones;
        },
    },
    actions: {
        /**
         * Fetch drones from the backend, validate them, and commit to the store.
         *
         * Behavior:
         * - Performs a fetch to the backend URL
         * - Checks HTTP errors (response.ok)
         * - Parses JSON payload
         * - Validates shape with Zod (validateDrones)
         * - Commits setDrones on success
         * - Logs errors on HTTP/validation/network failures
         */
        async fetchDrones({ commit }): Promise<void> {
            try {
                const response = await fetch(getBackendUrl());

                if (!response.ok) {
                    console.error(`HTTP error: ${response.status} ${response.statusText}`);
                    return;
                }

                const data = await response.json();
                const drones = validateDrones(data);
                commit("setDrones", drones);
                console.log("Drones fetched and validated:", drones);
            } catch (error) {
                console.error("Failed to fetch or validate drones:", error);
            }
        },
    },
    modules: {},
});

export default store;
