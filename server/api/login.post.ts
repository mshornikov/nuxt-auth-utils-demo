import { eq } from 'drizzle-orm';
import { z } from 'zod';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  await authorize(event, login);

  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  const user = await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.email, email))
    .get();

  if (!user) {
    throw createError({
      statusCode: 401,
      message: "User doesn't exist",
    });
  }

  const isPasswordValid = await verifyPassword(user.password, password);

  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      message: 'Wrong password',
    });
  }

  await setUserSession(event, {
    user: {
      name: email,
      role: user.role,
    },
  });
});
