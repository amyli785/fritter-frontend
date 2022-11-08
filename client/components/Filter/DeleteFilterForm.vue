<template>
  <form class="form-container" @submit.prevent="submit">
    <button class="round-click">🗑</button>
  </form>
</template>

<script>
export default {
  name: 'DeleteFilterForm',
  props: {
    filter: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async submit() {
      const url = `/api/filters/${this.filter._id}`;
      const options = {
        method: 'DELETE',
      };

      try {
        const r = await fetch(url, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshCustomFilters');
        this.$emit('done');
      } catch (e) {
        console.log(e);
        // TODO: deal with errors correctly
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  margin: 0.5vw;
  padding: 0.5vw;

  background-color: #E8ECED;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.round-click, .round-click:link, .round-click:hover, .round-click:visited {
  background-color: #B2DBE6;
}
</style>
