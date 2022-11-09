<template>
	<section class="account-settings-container">
    <LogoutForm class="account-settings-logout" />
    <ChangeUsernameForm class="account-settings-form" />
    <ChangePasswordForm class="account-settings-form" />
    <DeleteAccountForm class="account-settings-delete" />
  </section>
</template>

<script>
import LogoutForm from '@/components/Account/LogoutForm.vue';
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';

export default {
  name: 'AccountSettingsComponent',
  components: {
    LogoutForm,
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
  },
};
</script>

<style scoped>
.account-settings-container {
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;

  gap: 1vw;
}

.account-settings-logout {
  flex-basis: 100%;
}

.account-settings-form {
  flex-basis: 40%;
  flex-grow: 1;
}

.account-settings-delete {
  flex-basis: 100%;
}
</style>
