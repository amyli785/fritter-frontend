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
      <section class="filter-tab-modal-bar">
        <button
          v-for="filter in filters"
          :class="'round-click ' + (filter._id === filterEditing._id ? 'filter-tab-modal-bar-selected' : '')"
          :key="'option ' + filter._id"
          @click="filterEditing = filter"
        >
          {{ filter.name }}
        </button>
        <button
          :class="'round-click ' + (!filterEditing? 'filter-tab-modal-bar-selected' : '')"
          @click="filterEditing = false"
        >
          + New Filter
        </button>
      </section>
      <section v-if="!filterEditing" class="filter-tab-modal-content">
        <CreateFilterForm 
          submitText=""
          @done="stopUpdateFilters"
        />
      </section>
      <section v-else class="filter-tab-modal-content">
        <div class="filter-tab-modal-editing-current-container">
          <h3 class="filter-tab-modal-editing-current-header">Current Expression</h3>
          <p class="filter-tab-modal-editing-current-body">{{filterEditing.expression}}</p>
        </div>
        <DeleteFilterForm class="filter-tab-modal-editing-delete"
          :key="'delete ' + filterEditing._id"
          :filter="filterEditing"
          @done="stopUpdateFilters"
        />
        <EditFilterForm class="filter-tab-modal-editing-edit"
          :key="'edit ' + filterEditing._id"
          :filter="filterEditing"
          @done="stopUpdateFilters"
        />
      </section>
    </Modal>
  </section>
</template>
  
<script>
  import FilterTabComponent from '../Filter/FilterTabComponent.vue';
  import CreateFilterForm from '../Filter/CreateFilterForm.vue';
  import EditFilterForm from '../Filter/EditFilterForm.vue';
  import DeleteFilterForm from '../Filter/DeleteFilterForm.vue';
  import CreateFreetForm from '../Freet/CreateFreetForm.vue';
  import Modal from '../common/Modal.vue';
  
  export default {
    name: 'FilterTabBar',
    components: {FilterTabComponent, CreateFilterForm, EditFilterForm, DeleteFilterForm, CreateFreetForm, Modal},
    props: {
      filters: {
      type: Array,
      required: true
      }
    },
    data() {
      return {
        updatingFilters: false,
        filterEditing: false,
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
      startUpdateFilters() {
        this.updatingFilters = true;
        this.filterEditing = false;
      },
      stopUpdateFilters() {
        this.updatingFilters = false;
        this.filterEditing = false;
      },
    },
    mounted() {
      this.getFilters();
    }
  };
</script>

<style scoped>
  .filter-tab-bar {
	  display: flex;
    flex-direction: row;
	  justify-content: space-between;
	  align-items: center;
    gap: 1vw;
  }

  .filter-tab-modal-bar {
    width: 100%;

	  display: flex;
    flex-direction: row;
	  justify-content: flex-start;
	  align-items: center;
    gap: 1vw;
  }

  .filter-tab-modal-content {
    width: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
    gap: 1vw;
  }

  .filter-tab-modal-editing-current-container {
    flex-basis: 50%;
    flex-grow: 1;
    flex-shrink: 1;
    
    margin: 0;
    padding: 1vw;

    background-color: #E8ECED;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1vw;
  }

  .filter-tab-modal-editing-current-header {
    margin: 0;
    padding: 0;
  }
  
  .filter-tab-modal-editing-current-body {
    margin: 0;
    padding: 1vw 0;

    font-size: medium;
  }

  .filter-tab-modal-editing-delete {
    flex-basis: 10%;
    flex-shrink: 0;
  }

  .filter-tab-modal-editing-edit {
    flex-basis: 100%;
    flex-shrink: 0;
  }

  .filter-tab-selected {
    border-color: #000;
  }

  .filter-tab-modal-bar-selected {
    border-color: #000;
  }

  .alerts {
	  width: 25%;
  }
</style>
  