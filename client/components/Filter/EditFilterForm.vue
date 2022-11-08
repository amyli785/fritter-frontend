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
        {id: 'expression', label: 'new expression', value: ''},
        {id: 'name', label: 'new name', value: ''}
      ],
      title: "Edit Filter",
      submitText: "",
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
