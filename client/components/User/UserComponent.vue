<template>
  <router-link
    class="user-container invis-click"
    :to="`/user/${username}`"
  >
    <div class="user-picture-container">
      <RRPictureComponent
        :username="username"
      />
    </div>
    <h3>
      @{{ username }}
    </h3>
  </router-link>
</template>

<script>
import RRPictureComponent from '../RRPicture/RRPictureComponent.vue';

export default {
  name: 'UserComponent',
  components: {RRPictureComponent},
  props: {
    username: {
      Type: String,
      required: true,
    },
  },
};
</script>

<style scoped>

.user-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  gap: 1vmax;
}

.user-picture-container {
  width: 6vmax;
  height: 6vmax;
}

</style>
