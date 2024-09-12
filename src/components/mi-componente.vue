<template>
    <form @submit.prevent="submitForm">
        <div>
            <label for="username">Username:</label>
            <input id="username" v-model="form.username" />
        </div>
        <div>
            <label for="email">Email:</label>
            <input id="email" v-model="form.email" />
        </div>
        <div>
            <label for="password">Password:</label>
            <input id="password" type="password" v-model="form.password" />
        </div>
        <button type="submit">Submit</button>
        <button type="button" @click="resetForm">Reset</button>
    </form>
</template>

<script>
import { useForm } from '../composables/useForm';

export default {
    setup() {
        const { form, updateField, resetForm } = useForm();

        function submitForm() {
            // Aquí iría la lógica para enviar el formulario
            console.log('Form submitted:', form);
        }

        return {
            form,
            updateField,
            resetForm,
            submitForm
        };
    }
};
</script>