import { API_URL } from "@/constants";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // auth data
    auth: {
      token: null,
    },

    // syncing
    sync: {
      initialized: false,
      synchronized: false,
      failed: false,
    },

    // data
    wrap: {
      data: {
        version: 0,
      },
    },
  },
  getters: {
    isSyncing(state) {
      return !state.sync.synchronized && !state.sync.failed;
    },
    hasSyncingFailed(state) {
      return !state.sync.synchronized && state.sync.failed;
    },
    data(state) {
      return state.wrap.data;
    },
  },
  mutations: {
    setToken(state, { token }) {
      console.log("comitting", token);
      state.auth.token = token;
    },
    syncCallback(state, { data }) {
      state.sync.synchronized = true;
      state.sync.failed = false;
      state.wrap.data = data; // TODO vue set
    },
    syncPending(state) {
      state.sync.synchronized = false;
      state.sync.failed = false;
    },
    syncFailed(state) {
      state.sync.synchronized = false;
      state.sync.failed = true;
    },
    initializeStore(state) {
      try {
        const data = localStorage.setItem("rewardivy-storage");
        if (!data) return;
        const parsedData = JSON.parse(data);
        state.auth.token = parsedData.token;
        state.wrap.data = parsedData.data; // TODO vue set
        state.sync.synchronized = parsedData.saved;
      } catch {
        return;
      } finally {
        state.sync.initialized = true;
      }
    },
    updateData(state, cb) {
      cb(state.wrap.data);
      state.sync.synchronized = false;
    },
  },
  actions: {
    async initializeStore({ state, commit, dispatch }) {
      try {
        commit("initializeStore");
        if (!state.sync.synchronized) {
          dispatch("startSync");
        }
      } catch {
        return;
      }
    },
    async startSync({ commit, state }) {
      if (state.sync.synchronized) return;
      commit("syncPending");
      try {
        const result = await fetch(`${API_URL}/data/@me`, {
          method: "POST",
          body: JSON.stringify(state.wrap.data),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state.auth.token,
          },
        });
        if (!result.success) throw new Error("Failed to save");
        commit("syncCallback");
      } catch {
        commit("syncFailed");
      }
    },

    // state updates
    async incrementVersion({ commit, dispatch }, payload) {
      commit("updateData", (d) => {
        d.version += payload.version;
      });
      dispatch("startSync");
    },
  },
});

store.subscribe((mutation, state) => {
  const data = {
    token: state.auth.token,
    data: state.wrap.data,
    saved: state.sync.synchronized,
  };
  localStorage.setItem("rewardivy-storage", JSON.stringify(data));
});

export default store;
