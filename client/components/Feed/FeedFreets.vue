<template>
	<section
    v-if="$store.state.freets.length"
  >
    <FreetComponent
    v-for="freet in $store.state.freets"
    :key="freet.id"
    :freet="freet"
    />
  </section>
  <article
    v-else
  >
    <h3>No freets found.</h3>
  </article>
</template>

<script>
  import FreetComponent from '../Freet/FreetComponent.vue';

  export default {
    name: 'FeedFreets',
    components: {FreetComponent},
    data() {
      return {
      alerts: {},
      };
    },
    methods: {
      async getFreets() {
        const url = this.$store.state.currentFilter._id ? `/api/feed/${this.$store.state.currentFilter._id}` : '/api/feed';
        try {
          const r = await fetch(url);
          const res = await r.json();
          if (!r.ok) {
            throw new Error(res.error);
          }

          this.$store.commit('updateFreets', res);
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      },
    },
    mounted() {
      this.getFreets();
    },
  }
</script>

