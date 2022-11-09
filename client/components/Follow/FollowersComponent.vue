<template>
  <section class="followers-container">
    <UserComponent
      v-for="follower in followers"
      :key="follower.username"
      :username="follower.username"
    />
  </section>
</template>

<script>
import UserComponent from '../User/UserComponent.vue';

export default {
  name: 'FollowersComponent',
  components: {UserComponent},
  data() {
    return {
      followers: [],
    };
  },
  methods: {
    async getFollowers() {
      const url = '/api/follow/followers';
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.followers = res;
      } catch (e) {
        this.$store.commit('alert', {
          message: e,
          status: 'error',
        });
      }
    }
  },
  mounted() {
    this.getFollowers();
  },
};
</script>

<style scoped>

.followers-container {
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1vmax;
}

</style>
