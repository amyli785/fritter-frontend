<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <div v-if="username" class="account-page-container">
      <section class="account-header-container">
        <button class="invis-click"
          @click="showEditRRPicture = true"
        >
          <RRPictureComponent class="account-picture-container"
            :username="username"
          />
        </button>
        <h3 class="account-handle">
        @{{ username }}
        </h3>
        <div class="account-button-row-container">
          <button
            class="round-click"
            @click="showEditAudienceGroups = true"
          >
            Edit Audience Groups
          </button>
        </div>
        <div class="account-button-row-container">
          <button
            class="round-click"
            @click="showFollowers = true"
          >
            Followers
          </button>
          <button
            class="round-click"
            @click="showFollowing = true"
          >
            Following
          </button>
        </div>
        <div class="account-button-row-container">
          <button
            class="round-click"
            @click="showAccountSettings = true"
          >
            Account Settings
          </button>
        </div>
      </section>
      <UserFreets
        :username="username"
      />
    </div>
		<NotLoggedIn v-else />
    <Modal
      v-if="showEditRRPicture"
      title="Edit Profile Picture"
      @close="showEditRRPicture = false"
    >
      Edit profile picture component
    </Modal>
    <Modal
      v-if="showEditAudienceGroups"
      title="Edit Audience Groups"
      @close="showEditAudienceGroups = false"
    >
      Edit audience groups component
    </Modal>
    <Modal
      v-if="showFollowers"
      title="Followers"
      @close="showFollowers = false"
    >
      Followers list
    </Modal>
    <Modal
      v-if="showFollowing"
      title="Following"
      @close="showFollowing = false"
    >
      Following list
    </Modal>
    <Modal
      v-if="showAccountSettings"
      title="Account Settings"
      @close="showAccountSettings = false"
    >
      Account settings component
    </Modal>
    <!-- <section>
      <header>
        <h2>Account settings for @{{ $store.state.username }}</h2>
      </header>
      <ChangeUsernameForm />
      <ChangePasswordForm />
    </section>
    <section>
      <header>
        <h2>Account management</h2>
      </header>
      <LogoutForm />
      <DeleteAccountForm />
    </section> -->
  </main>
</template>

<script>
import NotLoggedIn from '../common/NotLoggedIn.vue';
import Modal from '../common/Modal.vue';
import RRPictureComponent from '../RRPicture/RRPictureComponent.vue';
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';
import UserFreets from '../User/UserFreets.vue';

export default {
  name: 'AccountPage',
  components: {
    NotLoggedIn,
    Modal,
    RRPictureComponent,
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    LogoutForm,
    UserFreets,
  },
  data() {
    return {
      username: this.$store.state.username,
      showEditRRPicture: false,
      showEditAudienceGroups: false,
      showFollowers: false,
      showFollowing: false,
      showAccountSettings: false,
    };
  },
};
</script>

<style scoped>

.account-page-container {
  margin: 0;
  padding: 0;
}

.account-header-container {
  margin: 24pt 0;
  padding: 12pt;

  background-color: #b2dbe6;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 12pt;
}

.account-handle {
  margin: 0;
  padding: 0;
}

.account-button-row-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1vw;
}

.account-picture-container {
  width: 120pt;
  height: 120pt;
}

</style>
