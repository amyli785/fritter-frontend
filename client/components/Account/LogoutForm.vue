<!-- Form for signing out (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'LogoutForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users/session',
      method: 'DELETE',
      setUsername: true,
      title: '',
      submitText: 'Sign out',
      fields: [],
      // content: 'Taking a break? See you later.',
      callback: () => {
        this.$store.commit('alert', {
          message: 'You are now signed out!', status: 'success'
        });
        this.$emit('done');
      }
    };
  }
};
</script>
