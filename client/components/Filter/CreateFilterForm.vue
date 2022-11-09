<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateFilterForm',
  mixins: [BlockForm],
  data() {
    return {
      url: `/api/filters/`,
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'expression', label: 'expression', value: ''},
        {id: 'name', label: 'name', value: ''}
      ],
      title: "Create New Filter",
      content: 'Filter by author with `@username` or by tag with `#tagLabel` (alphanumeric only username and tag). Invert a filter with `!(<filter>)`. Find the intersection ("filter1 and filter 2") of two filters with `&(<filter1>,<filter2>)`. Find the union ("filter1 or filter2") of two filters with `|(<filter1>,<filter2>)`. No spaces allowed.',
      submitText: "Create",
      callback: (res) => {
        this.$store.commit('refreshCustomFilters');
        this.$store.commit('updateCurrentFilter', res);
        this.$store.commit('refreshFreets');
        this.$emit('done');
      }
    };
  }
};
</script>
