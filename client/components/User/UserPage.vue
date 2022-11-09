<template>
	<main>
    <div v-if="userId" class="user-page-container">
      <section class="account-header-container">
        <div class="account-picture-container">
          <RRPictureComponent
            :key="JSON.stringify($store.state.rrpictures)"
            :username="username"
          />
        </div>
        <h3 class="account-handle">
        @{{ username }}
        </h3>
        <div class="account-button-row-container">
          <UserUnFollowButton
            v-if="$store.state.username"
            class="round-click"
            :username="username"
          />
        </div>
      </section>
      <UserFreets v-if="$store.state.username"
        :username="username"
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
  components: {
    RRPictureComponent,
    UserUnFollowButton,
    UserFreets
  },
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

</style>
