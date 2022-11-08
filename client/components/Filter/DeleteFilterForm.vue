<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeleteFilterForm',
  props: {
    filter: {
      type: Object,
      required: true,
    },
  },
  mixins: [BlockForm],
  data() {
    return {
      url: `/api/filters/${this.filter._id}`,
      method: 'DELETE',
      hasBody: false,
      fields: [],
      title: "Delete Filter",
      submitText: "Delete",
      callback: (res) => {
        this.$store.commit('refreshCustomFilters');
        this.$store.commit('updateCurrentFilter', this.$store.state.filterAll);
        this.$store.commit('refreshFreets');
        this.$emit('done');
      }
    };
  }
};
</script>
