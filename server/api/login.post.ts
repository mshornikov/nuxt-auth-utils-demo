import { z } from 'zod';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const db = useDatabase();
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  const { rows } = await db.sql`SELECT * FROM users WHERE email = ${email}`;

  if (!rows || rows.length === 0) {
    throw createError({
      statusCode: 401,
      message: "User doesn't exist",
    });
  }

  const isPasswordValid = await verifyPassword(
    rows[0].password as string,
    password,
  );

  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      message: 'Wrong password',
    });
  }

  await setUserSession(event, {
    user: {
      name: email,
    },
  });
});
