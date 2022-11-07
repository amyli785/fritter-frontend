<template>
	<article class="picture-container">
    <div v-if="!this.rrpicture">
      None
    </div>
    <div v-else-if="this.rrpicture.pictureType === 'RawString'">
      {{ this.rrpicture.picture }}
    </div>
    <img v-else
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
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
  },
  mounted() {
    this.getPicture();
  },
};
</script>

<style scoped>

.picture-container {
  width: 100%;
  height: 100%;

  border-radius: 50%;
  border: 1pt solid lightgray;
  background-color: lightgray;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
}

</style>