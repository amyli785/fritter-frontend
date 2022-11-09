<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <div v-if="$store.state.username" class="account-page-container">
      <section class="account-header-container">
        <div class="account-picture-area-container invis-click" @click="showEditRRPicture = true">
          <div class="account-picture-container">
            <RRPictureComponent
              :key="JSON.stringify($store.state.rrpictures)"
              :username="$store.state.username"
            />
          </div>
          <p class="account-picture-area-text">Click to Edit Profile Picture</p>
        </div>
        <h3 class="account-handle" :key="$store.state.username">
        @{{ $store.state.username }}
        </h3>
        <div class="account-button-row-container">
          <button
            class="round-click"
            @click="showEditAudienceGroups = true"
          >
            Update Audience Groups
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
    <NotLoggedIn v-else class="account-not-logged-in-container" />
    <Modal
      v-if="showEditRRPicture"
      title="Update Profile Picture"
      @close="showEditRRPicture = false"
    >
      <UpdateRRPictureComponent 
        @close="showEditRRPicture = false"
      />
    </Modal>
    <Modal
      v-if="showEditAudienceGroups"
      title="Update Audience Groups"
      @close="showEditAudienceGroups = false"
    >
      <UpdateGroupsComponent
        :groups="$store.state.groups"
        @close="showEditAudienceGroups = false"
      />
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
import UpdateRRPictureComponent from '../RRPicture/UpdateRRPictureComponent.vue';
import UpdateGroupsComponent from '../Group/UpdateGroupsComponent.vue';
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
    UpdateRRPictureComponent,
    UpdateGroupsComponent,
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
    }
  }
};
</script>

<style scoped>

.account-page-container {
  margin: 0;
  padding: 0;
}

.account-not-logged-in-container {  
  margin: 6vh 0;
  padding: 2vw;
}

.invis-click, .invis-click:link, .invis-click:hover, .invis-click:visited {
  padding: 1vmax;

  background-color: #3c9eb9;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vmax;
}


</style>
