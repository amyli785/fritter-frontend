<template>
  <section
    v-if="$store.state.freets.length"
    class="feed-container"
  >
    <FreetComponent
    v-for="freet in $store.state.freets"
    :key="freet.id"
    :freet="freet"
    />
  </section>
  <article v-else>
    <h3 class="feed-no-freets">
      no freets found with filter {{$store.state.currentFilter.name}}
    </h3>
  </article>
</template>

<script>
  import FreetComponent from '../Freet/FreetComponent.vue';

  export default {
    name: 'FeedFreets',
    components: {FreetComponent},
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
          this.$store.commit('alert', {
            message: e,
            status: 'error',
          });
        }
      },
    },
    mounted() {
      this.getFreets();
    },
  }
</script>

