<!-- Form for creating freets (block style) -->

<template>
  <form class="form-container" @submit.prevent="submit">
    <article class="form-fields-container">
      <div class="form-field-container">
        <label class="form-field-label" for="content-textarea">content</label>
        <textarea class="form-field-input"
          name="content"
          :value="content"
          id="content-textarea"
          @input="content = $event.target.value"
        >
        </textarea>
      </div>
      <div class="form-field-container">
        <label class="form-field-label" for="audience-select">audience</label>
        <select
          class="form-field-input"
          name="audience"
          id="audience-select"
        >
          <option
            selected
            @click="audience = ''"
          >
            Public
          </option>
          <option
            v-for="group in $store.state.groups"
            :key="group._id"
            :value="group._id"
            @click="audience = $event.target.value"
          >
            {{group.name}}
          </option>
        </select>
      </div>
    </article>
    <button class="form-submit round-click" type="submit">Post</button>
  </form>
</template>

<script>
export default {
  name: 'CreateFreetForm',
  data() {
    return {
      content: "",
      audience: "",
    }
  },
  methods: {
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
        this.$store.commit('alert', {
          message: e,
          status: 'error',
        });
      }
    },
  },
};
</script>


<style scoped>

.round-click, .round-click:link, .round-click:hover, .round-click:visited {
  background-color: #B2DBE6;
  border-color: #B2DBE6;
}
</style>
