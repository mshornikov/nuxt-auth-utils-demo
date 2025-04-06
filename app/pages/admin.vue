<script lang="ts" setup>
definePageMeta({
  middleware: ['admin'],
});

const { clear: clearSession } = useUserSession();

const logout = async () => {
  await clearSession();
  await navigateTo('/login');
};
</script>

<template>
  <UContainer class="flex h-screen flex-col justify-center">
    <UCard>
      <h1 class="mb-2 text-xl font-semibold text-pretty">Admin apge</h1>
      <UButton @click="logout">Logout</UButton>
    </UCard>
  </UContainer>
</template>

<style></style>
