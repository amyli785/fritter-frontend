<!-- Form for creating freets (block style) -->

<template>
  <form @submit.prevent="submit">
    <h3>Write a Freet</h3>
    <article>
      <div>
        <label for="content-textarea">Content:</label>
        <textarea
          name="content"
          :value="content"
          id="content-textarea"
          @input="content = $event.target.value"
        >
        </textarea>
      </div>
      <div>
        <label for="audience-select">Audience:</label>
        <select
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
    <button type="submit">Check Symbol</button>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
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
      alerts: {},
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
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
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
      console.log(options);

      try {
        const r = await fetch(url, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshFreets');
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
  },
  mounted() {
    this.getGroups();
  },
};
</script>
