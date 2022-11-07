<template>
	<main>
    <section v-if="this.userId">
      <header>
        @{{ this.username }}
      </header>
      <RRPictureComponent class="user-picture"
        :username="this.username"
      />
      <UserUnFollowButton v-if="$store.state.username"
        :username="this.username"
      />
      <UserFreets v-if="$store.state.username"
        :username="this.username"
      />
    </section>
    <section v-else>
      User not found: @{{ this.username }}
    </section>
  </main>
</template>

<script>
import RRPictureComponent from '../RRPicture/RRPictureComponent.vue';
import UserUnFollowButton from '../User/UserUnFollowButton.vue';
import UserFreets from '../User/UserFreets.vue';

export default {
  name: 'UserPage',
  components: {RRPictureComponent, UserUnFollowButton, UserFreets},
  data() {
    return {
      username: this.$route.params.username,
      userId: '',
      alerts: {},
    };
  },
  methods: {
    async redirect() {
      if (this.username === this.$store.state.username) {
        this.$router.push({ path: '/account' });
      }
    },
    async getUsername() {
      const url = `/api/users/${this.username}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.userId = res._id;
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        this.username = toParams.username;
        this.userId = '';
        this.redirect();
        this.getUsername();
      }
    );
  },
  mounted() {
    this.redirect();
    this.getUsername();
  },
};
</script>

<style scoped>

.user-picture {
  width: 5cm;
  height: 5cm;
}

</style>
