<template>
	<article class="rrpicture-container">
    <div v-if="!this.rrpicture">
      None
    </div>
    <div v-else-if="this.rrpicture.pictureType === 'RawString'">
      {{ this.rrpicture.picture }}
    </div>
    <img v-else
      class="rrpicture-image"
      :src="this.rrpicture.picture"
      :alt="`@${this.username}'s profile picture`"
    />
  </article>
</template>

<script>
export default {
  name: 'RRPictureComponent',
  props: {
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      rrpicture: {},
      alerts: {},
    };
  },
  methods: {
    async getPicture() {
      const url = `/api/rrpictures/current/${this.username}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.rrpicture = res;
      } catch (e) {
        console.log(e);
        // TODO: deal with errors correctly
      }
    },
  },
  mounted() {
    this.getPicture();
  },
};
</script>

<style scoped>

.rrpicture-container {
  width: 100%;
  height: 100%;

  border-radius: 50%;
  background-color: #e8eced;
  overflow: hidden;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.rrpicture-image {
  max-width: 100%;
  max-height: 100%;
}

</style>