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
      hasBody: true,
      fields: [
      ],
      title: `Delete Filter ${this.filter.name}`,
      refreshCustomFilters: true,
      refreshFreets: true,
      callback: () => {
        const message = 'Successfully edited a filter!';
        this.$store.commit('updateCurrentFilter', this.$store.state.filterAll);
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>