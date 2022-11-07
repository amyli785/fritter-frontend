<template>
	<main>
    <section v-if="this.userId">
      <header>
        @{{ this.username }}
      </header>
    </section>
    <section v-else>
      User not found: @{{ this.username }}
    </section>
  </main>
</template>

<script>
export default {
  name: 'UserPage',
  data() {
    return {
      username: this.$route.params.username,
      userId: '',
      alerts: {},
    };
  },
  methods: {
    async getUsername() {
      const url = `/api/users/${this.username}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        console.log(res);
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.userId = res._id;
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        this.username = toParams.username;
        this.getUsername();
      }
    );
  },
  mounted() {
    this.getUsername();
  },
};
</script>
