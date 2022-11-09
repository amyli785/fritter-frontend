<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'AddGroupMemberForm',
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  mixins: [BlockForm],
  data() {
    return {
      url: `/api/groups/${this.group.name}`,
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'member', label: 'new member username', value: ''},
      ],
      title: "Add Group Member",
      submitText: "Add",
      callback: (res) => {
        // this.$store.commit('refreshGroups');
        this.$emit('done');
      }
    };
  }
};
</script>
