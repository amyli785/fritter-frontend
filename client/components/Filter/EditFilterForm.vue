<template>
  <form class="form-container" @submit.prevent="submit">
    <article class="form-items-container">
      <div class="form-item-container">
        <label class="form-item-label" for="expression-input">new expression</label>
        <input class="form-item-input"
          name="expression"
          :value="expression"
          id="expression-input"
          @input="expression = $event.target.value"
        >
      </div>
      <div class="form-item-container">
        <label class="form-item-label" for="name-input">new name</label>
        <input class="form-item-input"
          name="name"
          :value="name"
          id="name-input"
          @input="name = $event.target.value"
        >
      </div>
    </article>
    <button class="round-click">✓</button>
  </form>
</template>

<script>
export default {
  name: 'EditFilterForm',
  props: {
    filter: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      expression: "",
      name: "",
    };
  },
  methods: {
    async submit() {
      const url = `/api/filters/${this.filter._id}`;
      const body = {
        expression: this.expression,
        name: this.name,
      };
      const options = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'},
      };

      try {
        const r = await fetch(url, options);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.$store.commit('refreshCustomFilters');
        this.$store.commit('updateCurrentFilter', res);
        this.$store.commit('refreshFreets');
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
  flex-basis: 100%;

  margin: 0.5vw;
  padding: 0.5vw;

  background-color: #E8ECED;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.form-items-container {
  flex-basis: 100%;

  display: flex;
  flex-direction: column;
}

.form-item-container {
  display: flex;
  flex-direction: column;
}

.form-item-label {
  padding: 0.2em 0.2em;
  font-size: small;
}

.form-item-input {
  padding: 0.2em 0.2em;
  font-size: small;
}

.round-click, .round-click:link, .round-click:hover, .round-click:visited {
  background-color: #B2DBE6;
}
</style>
