<!-- Form for deleting account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeleteAccountForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'DELETE',
      setUsername: true,
      title: '',
      submitText: 'Delete Account',
      fields: [],
      content: 'Deleting your account is permanent and irreversible. Proceed only if you understand these consequences.',
      callback: () => {
        this.$store.commit('alert', {
          message: 'Your account has been deleted!', status: 'success'
        });
        this.$emit('done');
      }
    };
  }
};
</script>

<style scoped>
.round-click, .round-click:link, .round-click:hover, .round-click:visited {
  background-color: #B2442E;
  border-color: #B2442E;
  color: #fff;
}
</style>
