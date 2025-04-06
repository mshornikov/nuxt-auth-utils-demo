import { listUsers } from '~~/shared/utils/abilities';

export default defineEventHandler(async (event) => {
  await authorize(event, listUsers);

  const users = await db
    .select({
      id: tables.users.id,
      email: tables.users.email,
      role: tables.users.role,
    })
    .from(tables.users)
    .catch((error) => {
      console.error(error);
      throw createError({
        status: 500,
        message: 'Failed to get users',
      });
    });

  return { data: users };
});
