<script setup lang="ts">
const state = reactive({
  email: '',
  password: '',
});

const toast = useToast();
const onSubmit = async () => {
  $fetch('/api/register', {
    method: 'POST',
    body: state,
    onResponse: async ({ response: { ok } }) => {
      if (ok) {
        toast.add({
          title: 'Success',
          description: 'You are registered',
          color: 'success',
        });

        await navigateTo('/login');
      }
    },
    onResponseError: ({ response: { _data } }) => {
      toast.add({
        title: 'Error',
        description: _data.message,
        color: 'error',
      });
    },
  });
};
</script>

<template>
  <UContainer class="flex h-screen flex-col items-center justify-center">
    <UCard class="min-w-sm">
      <template #header>
        <h1 class="text-xl font-semibold text-pretty">Register</h1>
      </template>

      <UForm :state="state" class="space-y-4" @submit="onSubmit">
        <UFormField label="Email" name="email" required>
          <UInput v-model="state.email" type="email" />
        </UFormField>

        <UFormField label="Password" name="password" required>
          <UInput v-model="state.password" type="password" />
        </UFormField>

        <UButton type="submit"> Submit </UButton>
      </UForm>
    </UCard>
  </UContainer>
</template>
