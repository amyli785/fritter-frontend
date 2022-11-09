<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeleteCurrentRRPictureForm',
  mixins: [BlockForm],
  data() {
    return {
      url: `/api/rrpictures/current`,
      method: 'DELETE',
      hasBody: false,
      fields: [],
      title: "Delete Current Profile Picture",
      submitText: "Delete",
      callback: (res) => {
        this.$emit('done');
      }
    };
  }
};
</script>
