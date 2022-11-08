<template>
  <div id="app" class="app">
    <header>
      <NavBar />
    </header>
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue';

export default {
  name: 'App',
  components: {NavBar},
  beforeCreate() {
    // Sync stored username to current session
    fetch('/api/users/session', {
      credentials: 'same-origin' // Sends express-session credentials with request
    }).then(res => res.json()).then(res => {
      const user = res.user;
      this.$store.commit('setUsername', user ? user.username : null);
    });

    // Clear alerts on page refresh
    this.$store.state.alerts = {};
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

.app {
  color: #000;
  font-family: Helvetica;
}

body {
  height: 100vh;
  flex-direction: column;
  display: flex;
  padding: 0;
  margin: 0;
  font-size: 1.2em;
}

main {
  padding: 0 5em 5em;
}

.alerts {
  position: absolute;
  z-index: 99;
  bottom: 0;
  top: 100%;
  left: 50%;
  transform: translate(-50%, 10%);
  width: 100%;
  text-align: center;
}

.alerts article {
  border-radius: 5px;
  padding: 10px 20px;
  color: #fff;
}

.alerts p {
  margin: 0;
}

.alerts .error {
  background-color: rgb(166, 23, 33);
}

.alerts .success {
  background-color: rgb(45, 135, 87);
}

.round-click, .round-click:link, .round-click:hover, .round-click:visited {
  padding: 1vw;
	margin: 0vw 0.5vw;
  border-radius: 2vw;
  background-color: #fff;

  border: none;

  color: #000;
  text-decoration: none;
  font-size: medium;
}

.round-click:hover {
  cursor: pointer;
}

.invis-click, .invis-click:link, .invis-click:hover, .invis-click:visited {
  border: none;

  color: #fff;
  text-decoration: none;
  font-size: medium;
}

.invis-click:hover {
  cursor: pointer;
}

</style>
