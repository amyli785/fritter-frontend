<template>
  <section
    v-if="freets.length"
    class="feed-container"
  >
    <FreetComponent v-for="freet in freets"
    :key="freet.id"
    :freet="freet"
    />
  </section>
  <article v-else>
    <h3 class="feed-no-freets">
      no freets found by <strong>@{{username}}</strong>
    </h3>
  </article>
</template>

<script>
  import FreetComponent from '../Freet/FreetComponent.vue';

  export default {
    name: 'UserFreets',
    components: {FreetComponent},
    props: {
      username: {
        Type: String,
        required: true,
      },
    },
    data() {
      return {
        freets: [],
      };
    },
    methods: {
      async getFreets() {
        const url = `/api/feed/author/${this.username}`;
        try {
          const r = await fetch(url);
          const res = await r.json();
          if (!r.ok) {
            throw new Error(res.error);
          }

          this.freets = res;
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

