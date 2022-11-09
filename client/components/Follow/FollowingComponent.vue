<template>
  <section class="following-container">
    <UserComponent
      v-for="followee in following"
      :key="followee.username"
      :username="followee.username"
    />
  </section>
</template>

<script>
import UserComponent from '../User/UserComponent.vue';

export default {
  name: 'FollowingComponent',
  components: {UserComponent},
  data() {
    return {
      following: [],
    };
  },
  methods: {
    async getFollowing() {
      const url = '/api/follow/following';
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.following = res;
      } catch (e) {
        console.log(e);
        // TODO: deal with errors correctly
      }
    }
  },
  mounted() {
    this.getFollowing();
  },
};
</script>

<style scoped>

.following-container {
  width: 100%;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1vmax;
}

</style>
