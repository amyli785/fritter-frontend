<template>
  <div class="update-groups-container">
    <section class="update-groups-bar">
      <button
        v-for="group in groups"
        :class="'round-click ' + (group._id === groupEditing._id ? 'update-groups-bar-selected' : 'update-groups-bar-unselected')"
        :key="'option ' + group._id"
        @click="groupEditing = group"
      >
        {{ group.name }}
      </button>
      <button
        :class="'round-click ' + (!groupEditing? 'update-groups-bar-selected' : 'update-groups-bar-unselected')"
        @click="groupEditing = false"
      >
        + New Group
      </button>
    </section>
    <section v-if="!groupEditing" class="update-groups-content">
      <CreateGroupForm />
    </section>
    <section v-else class="update-groups-content">
      <AddGroupMemberForm class="update-groups-editing-edit"
        :group="groupEditing"
        @done="updateGroupEditing"
      />
      <DeleteGroupMemberForm class="update-groups-editing-edit"
        :group="groupEditing"
        @done="updateGroupEditing"
      />
      <div class="update-groups-editing-current-container">
        <h3 class="update-groups-editing-current-header">Group Members</h3>
        <p v-if="groupEditing.members.length > 0" class="update-groups-editing-current-body">
          <UserComponent
            v-for="member in groupEditing.members"
            class="update-groups-editing-current-user"
            :key="member.memberId"
            :username="member.memberUsername"
          />
        </p>
        <p v-else>
          No group members.
        </p>
      </div>
      <DeleteGroupForm class="update-groups-editing-delete"
        :group="groupEditing"
        @done="groupEditing = false"
      />
    </section>
  </div>
</template>

<script>
import CreateGroupForm from '../Group/CreateGroupForm.vue';
import AddGroupMemberForm from '../Group/AddGroupMemberForm.vue';
import DeleteGroupMemberForm from '../Group/DeleteGroupMemberForm.vue';
import DeleteGroupForm from '../Group/DeleteGroupForm.vue';
import UserComponent from '../User/UserComponent.vue'

export default {
  name: 'UpdateGroupsComponent',
  components: {
    CreateGroupForm,
    AddGroupMemberForm,
    DeleteGroupMemberForm,
    DeleteGroupForm,
    UserComponent,
  },
  props: {
    groups: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      groupEditing: false,
    };
  },
  methods: {
    async updateGroupEditing() {
      const url = `/api/groups`;
      const res = await fetch(url).then(async r => r.json());
      this.$store.commit('updateGroups', res);

      const groupEditingId = this.groupEditing._id;
      const groupEditingNew = this.$store.state.groups.find(group => group._id === groupEditingId);
      this.groupEditing = groupEditingNew;
    },
  },
  mounted() {
    this.groupEditing = false;
  },
};
</script>

<style scoped>

  .update-groups-container {
    height: 100%;
    width: 100%;

    margin: 0;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1vmax;
  }

  .update-groups-bar {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 1vmax;
  }

  .update-groups-content {
    width: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
    gap: 1vmax;
  }

  .update-groups-editing-current-container {
    flex-basis: 50%;
    flex-grow: 1;
    flex-shrink: 1;
    
    margin: 0;
    padding: 1vmax;

    background-color: #E8ECED;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1vmax;
  }

  .update-groups-editing-current-header {
    margin: 0;
    padding: 0;
  }
  
  .update-groups-editing-current-body {
    width: 100%;

    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    gap: 0.4vmax;
  }

  .update-groups-editing-current-user {
    margin: 0;
    padding: 0.4vmax;

    align-self: stretch;
    background-color: #3c9eb9;
  }

  .update-groups-editing-delete {
    flex-basis: 10%;
    flex-shrink: 0;
  }

  .update-groups-editing-edit {
    flex-basis: 40%;
    flex-grow: 1;
    flex-shrink: 0;
  }

  .update-groups-bar-selected {
    border-color: #000;
  }

  .update-groups-bar-unselected, .round-click:hover {
    border-color: #B2DBE6;
  }

  .round-click, .round-click:link, .round-click:hover, .round-click:visited {
    background-color: #B2DBE6;
  }

</style>
