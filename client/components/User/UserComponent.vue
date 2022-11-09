<template>
  <a :href="`/user/${this.username}`" class="user-container invis-click">
    <RRPictureComponent class="user-picture-container"
      :username="this.username"
    />
    <h3>
      @{{ this.username }}
    </h3>
  </a>
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
