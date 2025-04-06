import { eq } from 'drizzle-orm';
import { number, object } from 'zod';

export default defineEventHandler(async (event) => {
  await authorize(event, deleteUser);

  const { id } = await getValidatedRouterParams(
    event,
    object({
      id: number({ coerce: true }),
    }).parse,
  );

  const result = await db
    .delete(tables.users)
    .where(eq(tables.users.id, id))
    .catch((error) => {
      console.error(error);
      throw createError({
        status: 500,
        message: 'Failed to delete user',
      });
    });

  if (result.rowsAffected === 0) {
    throw createError({
      status: 404,
      message: 'User not found',
    });
  }

  return { message: 'User deleted successfully' };
});
