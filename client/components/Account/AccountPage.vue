<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <div v-if="$store.state.username" class="account-page-container">
      <section class="account-header-container">
        <button class="invis-click"
          @click="showEditRRPicture = true"
        >
          <RRPictureComponent class="account-picture-container"
            :username="$store.state.username"
          />
        </button>
        <h3 class="account-handle" :key="$store.state.username">
        @{{ $store.state.username }}
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
        :key="$store.state.username"
        :username="$store.state.username"
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
      <FollowersComponent />
    </Modal>
    <Modal
      v-if="showFollowing"
      title="Following"
      @close="showFollowing = false"
    >
      <FollowingComponent />
    </Modal>
    <Modal
      v-if="showAccountSettings"
      title="Account Settings"
      @close="showAccountSettings = false"
    >
      <AccountSettingsComponent @close="showAccountSettings = false" @home="home"/>
    </Modal>
  </main>
</template>

<script>
import NotLoggedIn from '../common/NotLoggedIn.vue';
import Modal from '../common/Modal.vue';
import RRPictureComponent from '../RRPicture/RRPictureComponent.vue';
import UserFreets from '../User/UserFreets.vue';
import FollowersComponent from '../Follow/FollowersComponent.vue';
import FollowingComponent from '../Follow/FollowingComponent.vue';
import AccountSettingsComponent from '../Account/AccountSettingsComponent.vue';

export default {
  name: 'AccountPage',
  components: {
    NotLoggedIn,
    Modal,
    RRPictureComponent,
    UserFreets,
    FollowersComponent,
    FollowingComponent,
    AccountSettingsComponent,
  },
  data() {
    return {
      showEditRRPicture: false,
      showEditAudienceGroups: false,
      showFollowers: false,
      showFollowing: false,
      showAccountSettings: false,
    };
  },
  methods: {
    home() {
      this.$router.push({name: 'Home'});
      // this.$emit('close');
    }
  }
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
