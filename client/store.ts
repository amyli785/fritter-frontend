import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const filterAll = { name: 'All', _id: '' };
const filterFollowing = { name: 'Following', _id: 'following' };

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filterAll: filterAll,
    filterFollowing: filterFollowing,
    customFilters: [],
    currentFilter: filterAll,
    freets: [], // All freets created in the app
    username: null, // Username of the logged in user
    userId: null,
    alerts: {}, // global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    async setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
      
      if (!state.username) {
        state.userId = null;
      } else {
        const url = `/api/users/${state.username}`;
        const res = await fetch(url).then(async r => r.json());
        state.userId = res._id;
      }
    },
    updateCurrentFilter(state, currentFilter) {
      /**
       * Update the stored current filter to the specified one.
       * @param currentFilter - new current filter to set
       */
      state.currentFilter = currentFilter;
    },
    updateCustomFilters(state, customFilters) {
      /**
       * Update the stored custom filters to the specified ones.
       * @param customFilters - new custom filters to set
       */
      state.customFilters = customFilters;
    },
    async refreshCustomFilters(state) {
      /**
       * Request the server for the currently available freets.
       */
      const url = '/api/filters';
      const res = await fetch(url).then(async r => r.json());
      state.customFilters = res;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.currentFilter._id ? `/api/feed/${state.currentFilter._id}` : '/api/feed';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    },
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
