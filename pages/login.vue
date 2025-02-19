<script setup lang="ts">
const { fetch: refreshSession } = useUserSession();

const state = reactive({
  email: '',
  password: '',
});

const toast = useToast();
const onSubmit = async () => {
  $fetch('/api/login', {
    method: 'POST',
    body: state,
  })
    .then(async () => {
      // Refresh the session on client-side and redirect to the home page
      await refreshSession();
      toast.add({
        title: 'Success',
        description: 'You are authorized',
        color: 'success',
      });
    })
    .catch(() =>
      toast.add({
        title: 'Error',
        description: 'Bad credentials',
        color: 'error',
      }),
    );
};
</script>

<template>
  <UContainer class="flex h-screen flex-col items-center justify-center">
    <UCard class="min-w-sm">
      <template #header>
        <h1 class="text-xl font-semibold text-pretty">Login</h1>
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
