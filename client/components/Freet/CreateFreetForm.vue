<!-- Form for creating freets (block style) -->

<template>
  <form class="form-container" @submit.prevent="submit">
    <!-- <h3 v-if="title" class="form-title">
      Compose a new Freet
    </h3> -->
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

.round-click, .round-click:link, .round-click:hover, .round-click:visited {
  background-color: #B2DBE6;
  border-color: #B2DBE6;
}
</style>
