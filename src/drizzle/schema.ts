import { pgTable, serial, text, boolean, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  isDoctor: boolean("is_doctor").default(false),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const remedies = pgTable("remedies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  userId: uuid("user_id").notNull().references(() => users.id),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
