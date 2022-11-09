<template>
	<div class="update-filter-tab-container">
    <section class="update-filter-tab-bar">
      <button
        v-for="filter in filters"
        :class="'round-click ' + (filter._id === filterEditing._id ? 'update-filter-tab-bar-selected' : 'update-filter-tab-bar-unselected')"
        :key="'option ' + filter._id"
        @click="filterEditing = filter"
      >
        {{ filter.name }}
      </button>
      <button
        :class="'round-click ' + (!filterEditing? 'update-filter-tab-bar-selected' : 'update-filter-tab-bar-unselected')"
        @click="filterEditing = false"
      >
        + New Filter
      </button>
    </section>
    <section v-if="!filterEditing" class="update-filter-tab-content">
      <CreateFilterForm 
        submitText=""
        @done="$emit('done')"
      />
    </section>
    <section v-else class="update-filter-tab-content">
      <div class="update-filter-tab-editing-current-container">
        <h3 class="update-filter-tab-editing-current-header">Current Expression</h3>
        <p class="update-filter-tab-editing-current-body">{{filterEditing.expression}}</p>
      </div>
      <DeleteFilterForm class="update-filter-tab-editing-delete"
        :key="'delete ' + filterEditing._id"
        :filter="filterEditing"
        @done="$emit('done')"
      />
      <EditFilterForm class="update-filter-tab-editing-edit"
        :key="'edit ' + filterEditing._id"
        :filter="filterEditing"
        @done="$emit('done')"
      />
    </section>
  </div>
</template>

<script>
import CreateFilterForm from '../Filter/CreateFilterForm.vue';
import EditFilterForm from '../Filter/EditFilterForm.vue';
import DeleteFilterForm from '../Filter/DeleteFilterForm.vue';

export default {
  name: 'UpdateFilterTabComponent',
  components: {
    CreateFilterForm,
    EditFilterForm,
    DeleteFilterForm,
  },
  props: {
    filters: {
    type: Array,
    required: true
    }
  },
  data() {
    return {
      filterEditing: false,
    };
  },
  mounted() {
    this.filterEditing = false;
  }
};
</script>

<style scoped>

  .update-filter-tab-container {
    height: 100%;
    width: 100%;

    margin: 0;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1vmax;
  }

  .update-filter-tab-bar {
    width: 100%;

	  display: flex;
    flex-direction: row;
	  justify-content: flex-start;
	  align-items: center;
    gap: 1vmax;
  }

  .update-filter-tab-content {
    width: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
    gap: 1vmax;
  }

  .update-filter-tab-editing-current-container {
    flex-basis: 50%;
    flex-grow: 1;
    flex-shrink: 1;
    
    margin: 0;
    padding: 1vmax;

    background-color: #E8ECED;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1vmax;
  }

  .update-filter-tab-editing-current-header {
    margin: 0;
    padding: 0;
  }
  
  .update-filter-tab-editing-current-body {
    margin: 0;
    padding: 1vmax 0;

    font-size: medium;
  }

  .update-filter-tab-editing-delete {
    flex-basis: 10%;
    flex-shrink: 0;
  }

  .update-filter-tab-editing-edit {
    flex-basis: 100%;
    flex-shrink: 0;
  }

  .update-filter-tab-bar-selected {
    border-color: #000;
  }

  .update-filter-tab-bar-unselected, .round-click:hover {
    border-color: #B2DBE6;
  }

  .round-click, .round-click:link, .round-click:hover, .round-click:visited {
    background-color: #B2DBE6;
  }

</style>
