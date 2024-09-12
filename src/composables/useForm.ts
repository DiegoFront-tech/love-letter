import { reactive } from 'vue';

export function useForm() {
  const form = reactive({
    username: '',
    email: '',
    password: ''
  });

  function updateField(field, value) {
    form[field] = value;
  }

  function resetForm() {
    form.username = '';
    form.email = '';
    form.password = '';
  }

  return {
    form,
    updateField,
    resetForm
  };
}