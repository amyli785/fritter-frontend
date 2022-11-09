<template>
  <section class="filter-tab-bar">
    <FilterTabComponent
      :class="'round-click ' + ($store.state.currentFilter._id === $store.state.filterAll._id ? 'filter-tab-selected' : '')"
      :filter="$store.state.filterAll"
    />
    <FilterTabComponent
      :class="'round-click ' + ($store.state.currentFilter._id === $store.state.filterFollowing._id ? 'filter-tab-selected' : '')"
      :filter="$store.state.filterFollowing"
    />
    <FilterTabComponent
      v-for="filter in filters"
      :class="'round-click ' + (filter._id === $store.state.currentFilter._id ? 'filter-tab-selected' : '')"
      :key="filter._id"
      :filter="filter"
    />
    <button class="round-click" @click="startUpdateFilters">
      Update Filters
    </button>
    <Modal
      v-if="updatingFilters"
      title="Update Filters"
      @close="stopUpdateFilters"
    >
      <UpdateFilterTabComponent
        :filters="filters"
        @done="stopUpdateFilters"
      />
    </Modal>
  </section>
</template>
  
<script>
  import Modal from '../common/Modal.vue';
  import FilterTabComponent from '../Filter/FilterTabComponent.vue';
  import UpdateFilterTabComponent from '../Filter/UpdateFilterTabComponent.vue';
  
  export default {
    name: 'FilterTabBar',
    components: {
      Modal,
      FilterTabComponent,
      UpdateFilterTabComponent,
    },
    props: {
      filters: {
      type: Array,
      required: true
      }
    },
    data() {
      return {
        updatingFilters: false,
        alerts: {},
      };
    },
    methods: {
      async getFilters() {
        const url = '/api/filters';
        try {
          const r = await fetch(url);
          const res = await r.json();
          if (!r.ok) {
            throw new Error(res.error);
          }
          this.$store.commit('updateCustomFilters', res);
        }
        catch(e) {
          console.log(e);
          // TODO: deal with errors correctly
        }
      },
      startUpdateFilters() {
        this.updatingFilters = true;
      },
      stopUpdateFilters() {
        this.updatingFilters = false;
      },
    },
    mounted() {
      this.getFilters();
      this.$store.commit('refreshGroups');
      this.$store.commit('resetRRPictures');
    }
  };
</script>

<style scoped>
  .filter-tab-bar {
	  display: flex;
    flex-direction: row;
	  justify-content: space-between;
	  align-items: center;
    gap: 1vmax;
  }

  .filter-tab-selected {
    border-color: #000;
  }

  .alerts {
	  width: 25%;
  }
</style>
  