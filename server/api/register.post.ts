import { z } from 'zod';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default defineEventHandler(async (event) => {
  const db = useDatabase();

  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  await db.sql`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE, password TEXT)`;

  const { rows } = await db.sql`SELECT * FROM users WHERE email = ${email}`;

  if (rows && rows.length > 0) {
    throw createError({
      statusCode: 409,
      message: 'User already exists with this email',
    });
  }

  const hashedPassword = await hashPassword(password);

  await db.sql`INSERT INTO users (email, password) VALUES (${email}, ${hashedPassword})`;
});
