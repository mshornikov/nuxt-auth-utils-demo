import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { USER_ROLE_TYPE } from '../../shared/utils/constants';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: USER_ROLE_TYPE }).notNull().default('user'),
});
