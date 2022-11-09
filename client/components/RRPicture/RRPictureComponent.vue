<template>
  <article class="rrpicture-container">
    <div
      v-if="!rrpicture"
      class="rrpicture-text"
    >
      None
    </div>
    <div
      v-else-if="rrpicture.pictureType === 'RawString'"
      class="rrpicture-text"
    >
      {{ rrpicture.picture }}
    </div>
    <img v-else
      class="rrpicture-image"
      :src="rrpicture.picture"
      :alt="`@${username}'s profile picture`"
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
    rrpictureOverwrite: {
      type: Object,
      default: undefined,
    }
  },
  data() {
    return {
      rrpicture: {},
      alerts: {},
    };
  },
  methods: {
    async getPicture() {
      if (this.rrpictureOverwrite) {
        this.rrpicture = this.rrpictureOverwrite;
        return;
      }

      const rrpictureStored = this.$store.state.rrpictures.find(
        entry => entry.username === this.username);
      if (rrpictureStored) {
        this.rrpicture = rrpictureStored.rrpicture;
        return;
      }

      const url = `/api/rrpictures/current/${this.username}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.rrpicture = res;
        this.$store.commit('addEntryToRRPictures', {username: this.username, rrpicture: res});
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

  color: #000;
  text-decoration: none;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.rrpicture-text {
  width: 100%;
  height: 100%;

  font-size: smaller;

  display: flex;
  justify-content: center;
  align-items: center;
}

.rrpicture-image {
  max-width: 100%;
  max-height: 100%;

  width: 100%;
  height: 100%;

  object-fit: cover;
}

</style>