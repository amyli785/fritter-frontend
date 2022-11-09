<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeleteGroupForm',
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
      method: 'DELETE',
      hasBody: false,
      fields: [],
      title: "Delete Group",
      submitText: "Delete",
      callback: (res) => {
        this.$store.commit('refreshGroups');
        this.$emit('done');
      }
    };
  }
};
</script>
