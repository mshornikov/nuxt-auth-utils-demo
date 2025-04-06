import { eq } from 'drizzle-orm';
import { z } from 'zod';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  const users = await db
    .select()
    .from(tables.users)
    .where(eq(tables.users.email, email));

  if (users.length > 0) {
    throw createError({
      statusCode: 409,
      message: 'User already exists with this email',
    });
  }

  const hashedPassword = await hashPassword(password);

  await db.insert(tables.users).values({ email, password: hashedPassword });
});
