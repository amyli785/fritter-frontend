<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateFilterForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/filters',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'expression', label: 'Expression', value: ''},
		    {id: 'name', label: 'Name', value: ''},
      ],
      title: 'Create a Filter',
      refreshCustomFilters: true,
      refreshFreets: true,
      callback: () => {
        const message = 'Successfully created a filter!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
        console.log(this.res);
        this.$store.commit('updateCurrentFilter', this.res);
        this.$store.commit('refreshFreets');
      }
    };
  }
};
</script>