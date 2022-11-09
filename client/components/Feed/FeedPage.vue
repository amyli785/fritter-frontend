<!-- Default page that also displays freets -->

<template>
	<main>
	  <section v-if="$store.state.username">
		<header>
		  <h2>Welcome @{{ $store.state.username }}</h2>
		</header>
    <FeedFreets />
	  </section>
	  <section v-else>
		<header>
		  <h2>Welcome to Fritter!</h2>
		</header>
		<NotLoggedIn />
	  </section>
	</main>
</template>
  
<script>
  import NotLoggedIn from '../common/NotLoggedIn.vue';
  import FeedFreets from '../Feed/FeedFreets.vue';
  
  export default {
    name: 'FeedPage',
    components: {NotLoggedIn, FeedFreets},
  };
</script>
  
<style scoped>
  section {
	display: flex;
	flex-direction: column;
  }
</style>
  