<template>
  <form class="form-container" @submit.prevent="submit">
    <h3 class="form-title">
      Add New Profile Picture
    </h3>
    <p class="form-content">
      Invalid links to images will not render correctly.
    </p>
    <article class="form-fields-container">
    <div class="form-field-container">
      <label class="form-field-label" for="picture-type-select">type</label>
      <select
        class="form-field-input"
        name="pictureType"
        id="picture-type-select"
      >
        <option
          v-for="pictureTypeOption in pictureTypeOptions"
          :key="pictureTypeOption.value"
          :value="pictureTypeOption.value"
          @click="pictureType = pictureTypeOption"
        >
          {{pictureTypeOption.name}}
        </option>
      </select>
    </div>
    <div class="form-field-container">
      <label class="form-field-label" for="picture-input">picture ({{pictureType.name}})</label>
      <input
        class="form-field-input"
        name="picture"
        :value="picture"
        id="picture-input"
        @input="picture = $event.target.value"
      >
    </div>
    <div class="form-field-container" v-if="rrpictureCurrent">
      <div class="form-field-checkbox-container">
        <input
          class="form-field-checkbox"
          type="checkbox"
          name="maintainPrevious"
          :value="maintainPrevious"
          id="maintain-previous-input"
          @input="maintainPrevious = $event.target.value"
        >
        <label class="form-field-label" for="maintain-previous-input">maintain current picture in previous pictures</label>
      </div>
    </div>
    </article>
    <button class="form-submit round-click" type="submit">Add</button>
  </form>
</template>
  
<script>

  const pictureTypeRawString = {name: 'string', value: 'RawString'};
  const pictureTypeLink = {name: 'link', value: 'Link'}

  export default {
  name: 'AddCurrentRRPictureForm',
  props: {
    rrpictureCurrent: {
      type: Object,
    },
  },
  data() {
    return {
      picture: "",
      pictureType: pictureTypeRawString,
      pictureTypeOptions: [pictureTypeRawString, pictureTypeLink],
      maintainPrevious: false,
    };
  },
  methods: {
    async submit() {
    const url = `/api/rrpictures/current`;
    const body = {
      picture: this.picture,
      pictureType: this.pictureType.value,
      maintainPrevious: this.maintainPrevious,
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
  
    this.picture="";
    this.pictureType="";
    this.maintainPrevious="";
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