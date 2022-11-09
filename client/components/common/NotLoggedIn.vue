<template>
  <article>
    <h3 class="not-logged-in">
    <router-link class="not-logged-in-click" to="/login">Sign in</router-link> to view this page of Fritter.
    </h3>
  </article>
</template>

<script>
export default {
  name: 'NotLoggedIn',
};
</script>

<style scoped>
.not-logged-in {
  margin: 0;
  padding: 0;
  color: #000;
  background-color: rgba(0, 0, 0, 0);
  text-decoration: none;
  font-weight: normal;
}

.not-logged-in-click {
  margin: 0;
  padding: 0;
  color: #000;
  background-color: rgba(0, 0, 0, 0);
  text-decoration: none;
  font-weight: bold;
}
</style>