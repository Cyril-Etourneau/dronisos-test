import Vue from "vue";
import Vuex from "vuex";
import { Drone, validateDrones } from "@/drones/schema";
import { getBackendUrl } from "@/utils/server";

Vue.use(Vuex);

type StoreState = {
    drones: Drone[];
};

const store = new Vuex.Store<StoreState>({
    state: {
        drones: [],
    },
    getters: {
        getDrones: (state) => state.drones,
    },
    mutations: {
        setDrones(state, drones) {
            state.drones = drones;
        },
    },
    actions: {
        async fetchDrones({ commit }) {
            try {
                const response = await fetch(getBackendUrl());
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
