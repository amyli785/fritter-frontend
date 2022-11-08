<!-- Form for creating freets (block style) -->

<template>
  <form class="form-container" @submit.prevent="submit">
    <article class="form-items-container">
      <div class="form-item-container">
        <label class="form-item-label" for="content-textarea">content</label>
        <textarea class="form-item-input"
          name="content"
          :value="content"
          id="content-textarea"
          @input="content = $event.target.value"
        >
        </textarea>
      </div>
      <div class="form-item-container">
        <label class="form-item-label" for="audience-select">audience</label>
        <select
          class="form-item-input"
          name="audience"
          id="audience-select"
        >
          <option disabled selected value>select a group to post to</option>
          <option
            v-for="group in this.groups"
            :key="group._id"
            :value="group._id"
            @click="audience = $event.target.value"
          >
            {{group.name}}
          </option>
        </select>
      </div>
    </article>
    <button class="round-click" type="submit">✓</button>
  </form>
</template>

<script>
export default {
  name: 'CreateFreetForm',
  data() {
    return {
      content: "",
      audience: "",
      groups: {},
    }
  },
  methods: {
    async getGroups() {
      const url = '/api/groups';
      try {
        const r = await fetch(url);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        const res = await r.json();
        this.groups = res;
        console.log(this.groups);
      } catch(e) {
        console.log(e);
        // TODO: deal with errors correctly
      }
    },
    async submit() {
      const url = '/api/freets';
      const httpBody = {
        content: this.content,
        audience: this.audience,
        responseTo: '',
      };
      const options = {
        method: 'POST',
        body: JSON.stringify(httpBody),
        headers: {'Content-Type': 'application/json'},
      };

      try {
        const r = await fetch(url, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshFreets');
        this.$emit('done');
      } catch (e) {
        console.log(e);
        // TODO: deal with errors correctly
      }
    },
  },
  mounted() {
    this.getGroups();
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
