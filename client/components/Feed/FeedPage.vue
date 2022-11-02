<!-- Default page that also displays freets -->

<template>
	<main>
	  <section v-if="$store.state.username">
	  <FilterTabBar 
      ref="filterTabBar"
      :filters="this.$store.state.customFilters"
    />
		<header>
		  <h2>Welcome @{{ $store.state.username }}</h2>
		</header>
    <FeedFreets 
      ref="feedFreets"
    />
	  </section>
	  <section v-else>
		<header>
		  <h2>Welcome to Fritter!</h2>
		</header>
		<article>
		  <h3>
			<router-link to="/login">Sign in</router-link> to create, edit, and delete freets.
		  </h3>
		</article>
	  </section>
	</main>
</template>
  
<script>
  import FilterTabBar from '../Filter/FilterTabBar.vue';
  import FeedFreets from '../Feed/FeedFreets.vue';
  
  export default {
    name: 'FeedPage',
    components: {FilterTabBar, FeedFreets},
  };
</script>
  
<style scoped>
  section {
	display: flex;
	flex-direction: column;
  }
  
  header, header > * {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
  }
  
  button {
	  margin-right: 10px;
  }
  
  section .scrollbox {
	flex: 1 0 50vh;
	padding: 3%;
	overflow-y: scroll;
  }
</style>
  