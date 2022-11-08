<template>
  <section class="filter-tab-bar">
    <div>
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
    </div>
    <div>
      <button class="round-click" @click="startEditFilters">
        Edit Filters
      </button>
    </div>
    <Modal
      v-if="editingFilters"
      class="filter-tab-edit-modal"
      :id="'editFilters'"
      :closeLabel="'Cancel'"
      @close="stopEditFilters"
    >
      <section class="filter-tab-edit-bar filter-tab-edit-modal-item">
        <div class="filter-tab-edit-modal-item-sub">
          <button
            v-for="filter in filters"
            :class="'round-click ' + (filter._id === filterEditing._id ? 'filter-tab-edit-selected' : '')"
            :key="'option ' + filter._id"
            @click="filterEditing = filter"
          >
            {{ filter.name }}
          </button>
          <button
            :class="'round-click ' + (!filterEditing? 'filter-tab-edit-selected' : '')"
            @click="filterEditing = false"
          >
            +
          </button>
        </div>
      </section>
      <section v-if="!filterEditing" class="filter-tab-edit-modal-item">
        <CreateFilterForm />
      </section>
      <section v-else class="filter-tab-edit-modal-item">
        <div class="filter-tab-edit-modal-item-sub filter-tab-edit-modal-item-sub-container">
          <div class="filter-tab-edit-model-item-expression">current expression:</div>
          <div class="filter-tab-edit-model-item-expression">{{filterEditing.expression}}</div>
        </div>
        <div class="filter-tab-edit-modal-item-sub">
          <EditFilterForm
            :key="'edit ' + filterEditing._id"
            :filter="filterEditing"
            @done="stopEditFilters"
          />
          <DeleteFilterForm
            :key="'delete ' + filterEditing._id"
            :filter="filterEditing"
            @done="stopEditFilters"
          />
        </div>
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
        editingFilters: false,
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
      startEditFilters() {
        this.editingFilters = true;
        this.filterEditing = false;
      },
      stopEditFilters() {
        this.editingFilters = false;
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
	  position: relative;
  }

  .filter-tab-edit-modal {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    transition-duration: 0s;
  }

  .filter-tab-edit-bar {
	  display: flex;
    flex-direction: row;
	  justify-content: flex-start;
	  align-items: center;
	  position: relative;
  }

  .filter-tab-edit-modal-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    position: relative;
  }

  .filter-tab-edit-modal-item-sub {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    position: relative;
  }

  .filter-tab-edit-modal-item-sub-container {
    flex-basis: 100%;

    margin: 0.5vw;
    padding: 0.5vw;

    background-color: #E8ECED;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .filter-tab-edit-model-item-expression {
    padding: 0.2em 0.2em;
    font-size: small;
  }

  .filter-tab-selected {
    background-color: #B2DBE6;
  }

  .filter-tab-edit-selected {
    background-color: #3C9EB9;
  }

  .alerts {
	  width: 25%;
  }
</style>
  