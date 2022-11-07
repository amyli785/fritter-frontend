<template>
	<section v-if="freets.length">
    <FreetComponent v-for="freet in freets"
    :key="freet.id"
    :freet="freet"
    />
  </section>
  <article v-else>
    <h3>No freets found.</h3>
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
      	alerts: {},
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

