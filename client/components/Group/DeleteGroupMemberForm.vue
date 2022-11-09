<template>
  <form class="form-container" @submit.prevent="submit">
    <h3 class="form-title">
      Delete Group Member
    </h3>
    <article class="form-fields-container">
      <div class="form-field-container">
        <label class="form-field-label" for="member-input">member username to delete</label>
        <input class="form-field-input"
          name="member"
          :value="member"
          id="member-input"
          @input="member = $event.target.value"
        >
      </div>
    </article>
    <button class="form-submit round-click" type="submit">Delete</button>
  </form>
</template>

<script>
export default {
  name: 'DeleteGroupMemberForm',
  props: {
    group: {
      Type: Object,
      required: true,
    },
  },
  data() {
    return {
      member: "",
    }
  },
  methods: {
    async submit() {
      const url = `/api/groups/${this.group.name}/${this.member}`;
      const options = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
      };

      try {
        const r = await fetch(url, options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        // this.$store.commit('refreshGroups');
        this.$emit('done');
      } catch (e) {
        console.log(e);
        // TODO: deal with errors correctly
      }

      this.member="";
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