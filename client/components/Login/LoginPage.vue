<!-- Page for account sign-in and registration -->
<!-- User should be NOT authenticated in order to see this page -->

<template>
  <main class="login-page-container">
    <section class="login-page-field">
      <header>
        <h2>New to Fritter?</h2>
      </header>
      <RegisterForm />
    </section>
    <section class="login-page-field">
      <header>
        <h2>Have an account?</h2>
      </header>
      <LoginForm />
    </section>
  </main>
</template>

<script>
import RegisterForm from '@/components/Login/RegisterForm.vue';
import LoginForm from '@/components/Login/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: {
    RegisterForm,
    LoginForm
  }
};
</script>

<style scoped>
.login-page-container {
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  gap: 1vmax;
}

.login-page-field {
  flex-basis: 40%;
  flex-grow: 1;
  flex-shrink: 1;
}
</style>
