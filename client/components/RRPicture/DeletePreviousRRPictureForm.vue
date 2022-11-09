<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeletePreviousRRPictureForm',
  props: {
    rrpicture: {
      type: Object,
      required: true,
    },
  },
  mixins: [BlockForm],
  data() {
    return {
      url: `/api/rrpictures/previous/${this.rrpicture._id}`,
      method: 'DELETE',
      hasBody: false,
      fields: [],
      title: "Delete Previous Profile Picture",
      submitText: "Delete",
      callback: (res) => {
        this.$emit('done');
      }
    };
  }
};
</script>
