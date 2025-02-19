<script setup lang="ts">
definePageMeta({
  middleware: ['authenticated'],
});

const { user, clear: clearSession } = useUserSession();

async function logout() {
  await clearSession();
  await navigateTo('/login');
}
</script>

<template>
  <UContainer class="flex h-screen flex-col justify-center">
    <UCard>
      <h1 class="mb-2 text-xl font-semibold text-pretty">
        Welcome {{ user.name }}
      </h1>
      <UButton @click="logout">Logout</UButton>
    </UCard>
  </UContainer>
</template>
