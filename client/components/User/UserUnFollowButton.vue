<template>
  <button v-if="!isFollowing" @click="follow">
    Follow
  </button>
  <button v-else @click="unfollow">
    Unfollow
  </button>
</template>

<script>
export default {
  name: 'UserUnFollowButton',
  props: {
    username: {
      Type: String,
      required: true,
    },
  },
  data() {
    return {
      following: [],
      isFollowing: false,
    };
  },
  methods: {
    async getFollowing() {
      const url = `/api/follow/following`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.following = res;

      } catch (e) {
        this.$store.commit('alert', {
          message: e,
          status: 'error',
        });
      }
    },
    setIsFollowing() {
      this.isFollowing = this.following.some((user) => (user.username === this.username));
    },
    async follow() {
      const url = `/api/follow`;
      const httpBody = {
        followee: this.username,
      };
      const options = {
        method: 'POST',
        body: JSON.stringify(httpBody),
        headers: {'Content-Type': 'application/json'},
      };

      try {
        const r = await fetch(url, options);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.isFollowing = true;
        await this.getFollowing();
        this.setIsFollowing();

      } catch (e) {
        this.$store.commit('alert', {
          message: e,
          status: 'error',
        });
      }
    },
    async unfollow() {
      const url = `/api/follow/${this.username}`;
      const options = {
        method: 'DELETE',
      };

      try {
        const r = await fetch(url, options);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.isFollowing = false;
        await this.getFollowing();
        this.setIsFollowing();

      } catch (e) {
        this.$store.commit('alert', {
          message: e,
          status: 'error',
        });
      }
    },
  },
  mounted() {
    this.getFollowing().then(() => this.setIsFollowing());
  },
};
</script>

