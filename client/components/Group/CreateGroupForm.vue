<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateGroupForm',
  mixins: [BlockForm],
  data() {
    return {
      url: `/api/groups/`,
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'name', label: 'name', value: ''}
      ],
      title: "Create New Group",
      submitText: "",
      callback: (res) => {
        this.$store.commit('refreshGroups');
        this.$emit('done');
      }
    };
  }
};
</script>
