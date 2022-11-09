<template>
  <form class="form-container" @submit.prevent="submit">
    <h3 class="form-title">
      Revert to Previous Profile Picture
    </h3>
    <article class="form-fields-container">
    <div class="form-field-container" v-if="rrpictureCurrent">
      <div class="form-field-checkbox-container">
        <input
          class="form-field-checkbox"
          type="checkbox"
          name="maintainPrevious"
          :value="maintainPrevious"
          id="maintain-previous-input"
          @click="maintainPrevious = !maintainPrevious"
        >
        <label class="form-field-label" for="maintain-previous-input">maintain current picture in previous pictures</label>
      </div>
    </div>
    </article>
    <button class="form-submit round-click" type="submit">Revert</button>
  </form>
</template>
  
<script>

  export default {
  name: 'AddCurrentRRPictureForm',
  props: {
    rrpictureCurrent: {
      type: Object,
    },
    rrpicture: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      maintainPrevious: false,
    };
  },
  methods: {
    async submit() {
    const url = `/api/rrpictures/current`;
    const body = {
      picture: this.rrpicture.picture,
      pictureType: this.rrpicture.pictureType,
      maintainPrevious: this.maintainPrevious.toString(),
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'},
    };
  
    try {
      const r = await fetch(url, options);
      if (!r.ok) {
      const res = await r.json();
      throw new Error(res.error);
      }
      this.$emit('done');
    } catch (e) {
      console.log(e);
      // TODO: deal with errors correctly
    }
    },
  },
  };
  </script>
  
  
  <style scoped>

  .form-field-checkbox-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1vmax;
  }

  .form-field-checkbox {
    margin: 0;
    padding: 0;

    width: 1.6vmax;
    height: 1.6vmax;

    border-radius: 25%;
  }
  
  .round-click, .round-click:link, .round-click:hover, .round-click:visited {
  background-color: #B2DBE6;
  border-color: #B2DBE6;
  }
  </style>