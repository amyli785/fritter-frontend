<template>
  <div class="modal-mask">
    <div class="modal-container">
      <div class="modal-header-container">
        <h3 v-if="title" class="modal-header-title">{{ title }}</h3>
        <button class="round-click modal-close" @click="close">
          {{ this.closeLabel }}
        </button>
      </div>
      <div class="modal-content-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
    },
    closeLabel: {
      Type: String,
      default: 'Close',
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>

.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  background-color: rgba(0, 0, 0, 0.8);
  transition-duration: 0s;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.modal-container {
  width: 50%;
  padding: 1vw;
  background-color: #fff;
  transition-duration: 0s;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.modal-header-container {
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}

.modal-header-title {
  flex-basis: 100%;
  margin: 0;
}

.modal-content-container {
  height: 100%;
  width: 100%;

  margin: 1vw 0vw 0vw;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1vw;
}

.round-click, .round-click:link, .round-click:hover, .round-click:visited {
  background-color: #B2DBE6;
  border-color: #B2DBE6;
}
</style>

