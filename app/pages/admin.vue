<script lang="ts" setup>
import type { TableColumn } from '@nuxt/ui';

definePageMeta({
  middleware: ['admin'],
});

const { clear: clearSession } = useUserSession();

const logout = async () => {
  await clearSession();
  await navigateTo('/login');
};

const { data: users, refresh: updateUsersList } = useFetch('/api/users');

const toast = useToast();

// TODO infer types from API responce
type UserData = {
  role: string;
  id: number;
};

// TODO infer types from API responce
const columns: TableColumn<UserData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    id: 'action',
  },
];

const deleteUser = (id: number) =>
  $fetch(`/api/users/${id}`, {
    method: 'DELETE',
    onResponse: async ({ response: { ok } }) => {
      if (ok) {
        await updateUsersList();
        toast.add({
          title: 'User succesfully deleted',
          color: 'success',
          icon: 'i-lucide-circle-check',
        });
      }
    },
    onResponseError: () => {
      toast.add({
        title: 'User deletion error',
        color: 'error',
        icon: 'i-lucide-circle-x',
      });
    },
  });
</script>

<template>
  <UContainer class="flex h-screen flex-col justify-center">
    <UCard>
      <div class="flex flex-row justify-between">
        <h1 class="mb-2 text-xl font-semibold text-pretty">Admin apge</h1>
        <UButton @click="logout">Logout</UButton>
      </div>
      <UTable :data="users?.data" :columns>
        <template #action-cell="{ row }">
          <div class="flex justify-end">
            <UButton
              label="Delete"
              icon="i-lucide-trash"
              variant="outline"
              color="error"
              :disabled="row.original.role === 'admin'"
              @click="deleteUser(row.original.id)" />
          </div>
        </template>
      </UTable>
    </UCard>
  </UContainer>
</template>
