<template>
  <div :id="this.id">
    <div class="modal-mask">
      <div class="modal-container">
        <slot></slot>
        <button class="round-click" @click="this.close">
          {{ this.closeLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    id: {
      Type: String,
      required: true,
    },
    closeLabel: {
      Type: String,
      required: true,
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

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  transition-duration: 0s;
}

.modal-container {
  width: 50%;
  padding: 1vw;
  background-color: #fff;

  transition-duration: 0s;
}

.round-click, .round-click:link, .round-click:hover, .round-click:visited {
  background-color: #B2DBE6;
}
</style>

