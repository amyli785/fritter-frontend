<template>
	<main>
    <div v-if="this.userId" class="user-page-container">
      <section class="user-header-container">
        <RRPictureComponent class="user-picture-container"
          :username="this.username"
        />
        <h3 class="user-handle">
        @{{ this.username }}
        </h3>
        <UserUnFollowButton
          v-if="$store.state.username"
          class="round-click user-un-follow-button"
          :username="this.username"
        />
      </section>
      <UserFreets v-if="$store.state.username"
        :username="this.username"
      />
    </div>
    <div v-else class="user-page-container">
      <h1>
        User not found: @{{ this.username }}
      </h1>
    </div>
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

.user-page-container {
  margin: 0;
  padding: 0;
}

.user-header-container {
  margin: 24pt 0;
  padding: 12pt;

  background-color: #b2dbe6;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.user-picture-container {
  width: 5cm;
  height: 5cm;
}

</style>
