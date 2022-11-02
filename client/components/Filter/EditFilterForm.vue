<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'EditFilterForm',
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
      method: 'PUT',
      hasBody: true,
      fields: [
        {id: 'expression', label: 'Expression', value: ''},
		    {id: 'name', label: 'Name', value: ''},
      ],
      title: `Edit Filter ${this.filter.name}`,
      refreshCustomFilters: true,
      refreshFreets: true,
      callback: () => {
        const message = 'Successfully edited a filter!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>