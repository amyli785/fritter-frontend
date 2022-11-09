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
        {id: 'name', label: 'eame', value: ''}
      ],
      title: "Create New Filter",
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
