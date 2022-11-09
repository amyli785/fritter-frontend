<!-- Reusable component representing a form in a block style -->
<!-- This is just an example; feel free to define any reusable components you want! -->

<template>
  <form class="form-container" @submit.prevent="submit">
    <h3 v-if="title" class="form-title">
      {{title}}
    </h3>
    <p v-if="content" class="form-content">
      {{content}}
    </p>
    <article
      v-if="fields.length"
      class="form-fields-container"
    >
      <div
        v-for="field in fields"
        class="form-field-container"
        :key="field.id"
      >
        <label class="form-field-label" :for="field.id">{{ field.label }}</label>
        <input
          class="form-field-input"
          :type="field.id === 'password' ? 'password' : 'text'"
          :name="field.id"
          :value="field.value"
          @input="field.value = $event.target.value"
        >
      </div>
    </article>
    <button class="form-submit round-click" type="submit">{{ submitText ? submitText : "Submit"}}</button>
  </form>
</template>

<script>
export default {
  name: 'BlockForm',
  data() {
    /**
     * Options for submitting this form.
     */
    return {
      title: '',
      content: '',
      submitText: '',
      url: '', // Url to submit form to
      method: 'GET', // Form request method
      hasBody: false, // Whether or not form request has a body
      setUsername: false, // Whether or not stored username should be updated after form submission
      refreshFreets: false, // Whether or not stored freets should be updated after form submission
      refreshCustomFilters: false,
      callback: null // Function to run after successful form submission
    };
  },
  methods: {
    async submit() {
      /**
        * Submits a form with the specified options from data().
        */
      const options = {
        method: this.method,
        headers: {'Content-Type': 'application/json'},
        credentials: 'same-origin' // Sends express-session credentials with request
      };
      if (this.hasBody) {
        options.body = JSON.stringify(Object.fromEntries(
          this.fields.map(field => {
            const {id, value} = field;
            field.value = '';
            return [id, value];
          })
        ));
      }

      try {
        const r = await fetch(this.url, options);
        const res = await r.json();
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          throw new Error(res.error);
        }

        if (this.setUsername) {
          const username = res && res.user ? res.user.username : null;
          this.$store.commit('setUsername', res.user ? res.user.username : null);
        }

        if (this.refreshFreets) {
          this.$store.commit('refreshFreets');
        }

        if (this.refreshCustomFilters) {
          this.$store.commit('refreshCustomFilters');
        }

        if (this.callback) {
          this.callback(res);
        }
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
