<template>
	<article class="picture-container">
    <div class="picture-display">
      {{ this.display }}
    </div>
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
      display: '',
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
        
        if (!this.rrpicture) {
          this.display = 'None';
        } else if (this.rrpicture.pictureType === 'RawString') {
          this.display = this.rrpicture.picture;
        } else {
          this.display = 'TODO'
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    setDisplay() {
    }
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

.picture-display {
  flex-basis: 0;

  text-align: center;
  vertical-align: center;
}

</style>