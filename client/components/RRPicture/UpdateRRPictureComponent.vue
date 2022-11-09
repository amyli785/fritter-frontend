<template>
	<div class="update-rrpicture-container">
		<section class="update-rrpicture-bar">
      <button 
        :class="'update-rrpicture-bar-button round-click ' + (showCurrent ? 'round-click-selected' : 'round-click-unselected')"
        @click="showCurrent = true"
      >
        Current Picture
      </button>
      <button
        :class="'update-rrpicture-bar-button round-click ' + (!showCurrent ? 'round-click-selected' : 'round-click-unselected')"
        @click="showCurrent = false"
      >
        Previous Pictures
      </button>
		</section>
    <section
      v-if="showCurrent"
      class="update-rrpicture-content-container"
    >
      <div class="update-rrpicture-current-picture-container">
        <RRPictureComponent
          :key="JSON.stringify($store.state.rrpictures)"
          :username="$store.state.username"
        />
      </div>
      <AddCurrentRRPictureForm
        :rrpictureCurrent="rrpictureCurrent"
        @done="doneCurrent"
      />
      <DeleteCurrentRRPictureForm
        v-if="rrpictureCurrent"
        @done="doneCurrent"
      />
    </section>
    <section
      v-else
      class="update-rrpicture-content-container"
    >
      previous pictures editor
    </section>
	</div>
</template>

<script>
import RRPictureComponent from '../RRPicture/RRPictureComponent.vue';
import AddCurrentRRPictureForm from '../RRPicture/AddCurrentRRPictureForm.vue';
import DeleteCurrentRRPictureForm from '../RRPicture/DeleteCurrentRRPictureForm.vue';

export default {
  name: 'UpdateRRPictureComponent',
  components: {
    RRPictureComponent,
    AddCurrentRRPictureForm,
    DeleteCurrentRRPictureForm,
  },
  data() {
    return {
      showCurrent: true,
      rrpictureCurrent: null,
    };
  },
  methods: {
    async getPicture() {
      this.$store.commit('resetRRPictures');
      const username = this.$store.state.username;
      const url = `/api/rrpictures/current/${username}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.rrpictureCurrent = res;
        this.$store.commit('addEntryToRRPictures', {username: username, rrpicture: res});
      } catch (e) {
        console.log(e);
        // TODO: deal with errors correctly
      }
    },
    doneCurrent() {
      this.getPicture();
      this.$emit('close');
    }
  },
  mounted() {
    this.getPicture();
  },
};
</script>

<style scoped>

.update-rrpicture-container {
  height: 100%;
  width: 100%;
  margin: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1vmax;
}

.update-rrpicture-bar {
  align-self: stretch;

  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  gap: 1vmax;
}

.update-rrpicture-bar-button {
  flex-basis: 50%;
  flex-grow: 1;
  flex-shrink: 1;
}

.update-rrpicture-content-container {
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1vmax;
}

.update-rrpicture-current-picture-container {
  width: 24vmax;
  height: 24vmax;
}

.round-click-selected {
  border-color: #000;
}

.round-click-unselected, .round-click:hover {
  border-color: #B2DBE6;
}

.round-click, .round-click:link, .round-click:hover, .round-click:visited {
  background-color: #B2DBE6;
}

</style>

