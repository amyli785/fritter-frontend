<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
  <article class="freet-container">
    <section class="freet-header-container">
      <UserComponent
        class="freet-author"
        :username="freet.author"
      />
      <p class="freet-date">
        {{ freet.dateModified }}
      </p>
      <button
        class="round-click"
        @click="showRespondTo = true"
      >
        + Respond
      </button>
    </section>
    <p class="freet-content" >
      {{ freet.content }}
    </p>
    <Modal
      v-if="showRespondTo"
      title="Respond"
      @close="showRespondTo = false"
    >
      <RespondToFreetForm
        :freet="freet"
        @done="showRespondTo = false"
      />
    </Modal>
  </article>
</template>

<script>
import Modal from '../common/Modal.vue';
import UserComponent from '../User/UserComponent.vue';
import RespondToFreetForm from '../Freet/RespondToFreetForm.vue';

export default {
  name: 'FreetComponent',
  components: {
    Modal,
    UserComponent,
    RespondToFreetForm,
  },
  props: {
    // Data from the stored freet
    freet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showRespondTo: false,
    };
  },
};
</script>

<style scoped>
.freet-container {
  background-color: #b2dbe6;
  padding: 2vmax;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 1vmax;
}

.freet-header-container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 1vmax;
}

.freet-author {
  padding: 1vmax;
  background-color: #3c9eb9;
}

.freet-date {
  align-self: stretch;
  margin: 0;
  padding: 1vmax;

  background-color: #E8ECED;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.freet-audience {
  margin: 0;
  padding: 1vmax;

  background-color: #E8ECED;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.freet-content {
  margin: 0;
  padding: 1vmax;

  background-color: #fff;
}
</style>
