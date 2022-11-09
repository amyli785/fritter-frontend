<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <div class="left">
      <FilterTabBar v-if="$store.state.username && $route.name==='Home'"
        :filters="this.$store.state.customFilters"
      />
      <router-link v-else class="round-click" to="/">
        Fritter
      </router-link>
    </div>
    <div class="right">
      <button v-if="$store.state.username"
        class="round-click nav-new-freet"
        @click="startCreatingFreet"
      >
        + New Freet
      </button>
      <router-link v-if="$store.state.username"
        class="round-click"
        to="/account"
      >
        Account
      </router-link>
      <router-link v-else
        class="round-click"
        to="/login"
      >
        Login
      </router-link>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
    <Modal
      v-if="creatingFreet"
      title="Compose a Freet"
      @close="stopCreatingFreet"
    >
      <CreateFreetForm
        @done="stopCreatingFreet"
      />
    </Modal>
  </nav>
</template>

<script>
import Modal from '../common/Modal.vue';
import FilterTabBar from '../Filter/FilterTabBar.vue';
import CreateFreetForm from '../Freet/CreateFreetForm.vue';

export default {
  name: 'NavBar',
  components: {Modal, FilterTabBar, CreateFreetForm},
  data() {
    return {
      creatingFreet: false,
    };
  },
  methods: {
    startCreatingFreet() {
      this.creatingFreet = true;
    },
    stopCreatingFreet() {
      this.creatingFreet = false;
    },
  },
};
</script>

<style scoped>
nav {
  padding: 1vmax 2vmax;
  background-color: #3C9EB9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.left {
  padding: none;
  margin: 0;
	display: flex;
  flex-direction: row;
  justify-content: flex-start;
	align-items: center;
}

.right {
  padding: none;
  margin: 0;
	display: flex;
  flex-direction: row;
  justify-content: flex-end;
	align-items: center;
  gap: 1vmax;
}

.alerts {
  width: 25%;
}

.nav-new-freet {
  border-color: #b2dbe6;
}

</style>
