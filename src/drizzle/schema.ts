import { pgTable } from "drizzle-orm/pg-core";
import { uuid, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const Requests = pgTable("requests", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdateFn(() => new Date()),
    status: varchar("status", { length: 50 }).notNull().default("pending"),
    response: text("response"),
   
})