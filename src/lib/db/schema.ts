import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const $notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  imageUrl: text("imageUrl"), // Dall-E image url
  userId: text("user_id").notNull(), // one to many -> 1 user to many notes // cleckUserId
  editorState: text("editor_state"), // notes description
});

export type Note = typeof $notes.$inferInsert;