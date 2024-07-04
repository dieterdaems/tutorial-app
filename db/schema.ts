import { integer, pgEnum, pgTable, serial, text, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

export const accounts = pgTable('accounts', {
    id: text('id').primaryKey(),
    plaidId: text('plaid_id'),
    name: text('name').notNull(),
    userId: text('user_id').notNull(),
});