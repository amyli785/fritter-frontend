<template>
  <div class="update-rrpicture-container">
    <section class="update-rrpicture-bar">
      <button 
        :class="'update-rrpicture-bar-button round-click ' + (showCurrent ? 'show-current-previous-selected' : 'show-current-previous-unselected')"
        @click="showCurrent = true"
      >
        Current Picture
      </button>
      <button
        :class="'update-rrpicture-bar-button round-click ' + (!showCurrent ? 'show-current-previous-selected' : 'show-current-previous-unselected')"
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
      v-else-if="rrpicturePreviousList.length > 0"
      class="update-rrpicture-content-container"
    >
      <div class="update-rrpicture-previous-pictures-container">
        <div
          v-for="rrpicturePreviousOne in rrpicturePreviousList"
          class="update-rrpicture-previous-picture-container"
          :key="rrpicturePreviousOne._id"
          @click="rrpicturePrevious = rrpicturePreviousOne"
        >
          <RRPictureComponent
            :class="'invis-click ' + (rrpicturePrevious && rrpicturePreviousOne._id === rrpicturePrevious._id ? 'update-rrpicture-previous-picture-selected' : 'update-rrpicture-previous-picture-unselected' )"
            :username="$store.state.username"
            :rrpictureOverwrite="rrpicturePreviousOne"
          />
        </div>
      </div>
      <RevertPreviousRRPictureForm
        v-if="rrpicturePrevious"
        :rrpictureCurrent="rrpictureCurrent"
        :rrpicture="rrpicturePrevious"
        @done="doneCurrent"
      />
      <DeletePreviousRRPictureForm
        v-if="rrpicturePrevious"
        :rrpicture="rrpicturePrevious"
        @done="donePreviousDelete"
      />
    </section>
  </div>
</template>

<script>
import RRPictureComponent from '../RRPicture/RRPictureComponent.vue';
import AddCurrentRRPictureForm from '../RRPicture/AddCurrentRRPictureForm.vue';
import DeleteCurrentRRPictureForm from '../RRPicture/DeleteCurrentRRPictureForm.vue';
import RevertPreviousRRPictureForm from '../RRPicture/RevertPreviousRRPictureForm.vue';
import DeletePreviousRRPictureForm from '../RRPicture/DeletePreviousRRPictureForm.vue';

export default {
  name: 'UpdateRRPictureComponent',
  components: {
    RRPictureComponent,
    AddCurrentRRPictureForm,
    DeleteCurrentRRPictureForm,
    RevertPreviousRRPictureForm,
    DeletePreviousRRPictureForm,
  },
  data() {
    return {
      showCurrent: true,
      rrpictureCurrent: null,
      rrpicturePrevious: null,
      rrpicturePreviousList: [],
    };
  },
  methods: {
    async getPicture() {
      this.$store.commit('resetRRPictures');
      const username = this.$store.state.username;
      const url = `/api/rrpictures/current`;
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
    async getPreviousList() {
      const url = `/api/rrpictures/previous`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.rrpicturePreviousList = res;
      } catch (e) {
        console.log(e);
        // TODO: deal with errors correctly
      }
    },
    doneCurrent() {
      this.getPicture();
      this.$emit('close');
    },
    donePreviousDelete() {
      this.getPreviousList();
      this.rrpicturePrevious = null;
    },
  },
  mounted() {
    this.getPicture();
    this.getPreviousList();
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

.update-rrpicture-previous-pictures-container {
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1vmax;
}

.update-rrpicture-current-picture-container {
  width: 24vmax;
  height: 24vmax;
}

.update-rrpicture-previous-picture-container {
  width: 4vmax;
  height: 4vmax;
}

.show-current-previous-selected {
  border-color: #000;
}

.show-current-previous-unselected, .round-click:hover {
  border-color: #B2DBE6;
}

.round-click, .round-click:link, .round-click:hover, .round-click:visited {
  background-color: #B2DBE6;
}

.update-rrpicture-previous-picture-selected {
  border: 0.2vmax solid #000;
}
.update-rrpicture-previous-picture-unselected {
  border: 0.2vmax solid transparent;
}

</style>

