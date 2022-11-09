<!-- Form for changing password (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'ChangePasswordForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'PATCH',
      hasBody: true,
      fields: [
        {id: 'password', label: 'password', value: ''}
      ],
      title: 'Change Password',
      submitText: 'Change Password',
      callback: () => {
        const message = 'Successfully changed password!';
        this.$store.commit('alert', {
          message: message, status: 'success'
        });
        this.$emit('done');
      }
    };
  }
};
</script>
