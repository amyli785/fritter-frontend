<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <button class="tab" @click="onClick">
    {{ this.filter.name }}
  </button>
</template>
  
<script>
  export default {
	name: 'FilterTabComponent',
	props: {
	  // Data from the stored filter
	  filter: {
		type: Object,
		required: true
	  }
	},
	data() {
	  return {
		alerts: {},
	  };
	},
	methods: {
	  onClick() {
      	this.$store.commit('updateCurrentFilter', this.filter);
		this.$store.commit('refreshFreets');
	  },
	},
	mounted() {
	},
  };
</script>
