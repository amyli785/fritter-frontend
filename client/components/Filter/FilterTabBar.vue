
<template>
  <section class="filter-tab-component">
    <section class="filter-tab-bar">
      <section class="left">
        <FilterTabComponent
          :filter="this.$store.state.filterAll"
        />
        <FilterTabComponent
          :filter="this.$store.state.filterFollowing"
        />
        <FilterTabComponent
          v-for="filter in this.filters"
          :key="filter.id"
          :filter="filter"
        />
      </section>
      <section class="right">
        <button @click="startCreateFreet" v-if="!creatingFreet">
          Create Freet
        </button>
        <button @click="endCreateFreet" v-else>
          Cancel Create Freet
        </button>
        <button @click="startEditFilters" v-if="!editingFilters">
          Edit Filters
        </button>
        <button @click="stopEditFilters" v-else>
          Done Editing Filters
        </button>
        <button @click="startCreateFilter" v-if="editingFilters && !creatingFilter" >
          Add Filter
        </button>
        <button @click="stopCreateFilter" v-if="editingFilters && creatingFilter" >
          Cancel Add Filter
        </button>
      </section>
    </section>
    <CreateFreetForm v-if="creatingFreet" />
    <section class="filter-tab-form" v-if="editingFilters">
      <CreateFilterForm v-if="creatingFilter" />
      <section v-if="!creatingFilter"></section>
        <section v-if="($store.state.currentFilter._id !== $store.state.filterAll._id) &&
                       ($store.state.currentFilter._id !== $store.state.filterFollowing._id)">
          <EditFilterForm
            :filter="$store.state.currentFilter"
          />
          <DeleteFilterForm
            :filter="$store.state.currentFilter"
          />
        </section>
        <h3 v-else>
          Cannot edit filter {{ $store.state.currentFilter.name }}
        </h3>
    </section>
  </section>
</template>
  
<script>
  import FilterTabComponent from '../Filter/FilterTabComponent.vue';
  import CreateFilterForm from '../Filter/CreateFilterForm.vue';
  import EditFilterForm from '../Filter/EditFilterForm.vue';
  import DeleteFilterForm from '../Filter/DeleteFilterForm.vue';
  import CreateFreetForm from '../Freet/CreateFreetForm.vue';
  
  export default {
    name: 'FilterTabBar',
    components: {FilterTabComponent, CreateFilterForm, EditFilterForm, DeleteFilterForm, CreateFreetForm},
    props: {
      filters: {
      type: Array,
      required: true
      }
    },
    data() {
      return {
        editingFilters: false,
        creatingFilter: false,
        creatingFreet: false,
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
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      },
      startEditFilters() {
        this.editingFilters = true;
        this.creatingFilter = false;
      },
      stopEditFilters() {
        this.editingFilters = false;
        this.creatingFilter = false;
      },
      startCreateFilter() {
        this.creatingFilter = true;
      },
      stopCreateFilter() {
        this.creatingFilter = false;
      },
      startCreateFreet() {
        this.creatingFreet = true;
      },
      endCreateFreet() {
        this.creatingFreet = false;
      },
    },
    mounted() {
      this.getFilters();
    }
  };
</script>

<style scoped>
  .filter-tab-component {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative
  }

  .filter-tab-bar {
	  padding: 1vw 0vw;
	  display: flex;
    flex-direction: row;
	  justify-content: space-between;
	  align-items: center;
	  position: relative;
  }

  .left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .right {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
  }

  .filter-tab-form {
	  margin: 1vw 2vw;
    background-color: #fff;
    position: relative;
  }

  button {
    margin: 0vw 0.5vw;
	  padding: 1vw;
    background-color: transparent;
    border-color: #000;
    border-width: 1pt;
    border-radius: 2vw;
    font-size: medium;
	  position: relative;
  }

  button:hover {
    cursor: pointer;
    background-color: #fff;
  }

  .alerts {
	  width: 25%;
  }
</style>
  