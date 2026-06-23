import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const ngosTable = pgTable("ngos", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  city: text("city").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  website: text("website"),
  phone: text("phone"),
  petsHelped: integer("pets_helped").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adoptablePetsTable = pgTable("adoptable_pets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  species: text("species").notNull(),
  breed: text("breed").notNull(),
  age: real("age").notNull(),
  imageUrl: text("image_url").notNull(),
  ngoId: integer("ngo_id").notNull(),
  ngoName: text("ngo_name").notNull(),
  description: text("description"),
  gender: text("gender"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertNgoSchema = createInsertSchema(ngosTable).omit({ id: true, createdAt: true });
export const insertAdoptablePetSchema = createInsertSchema(adoptablePetsTable).omit({ id: true, createdAt: true });
export type InsertNgo = z.infer<typeof insertNgoSchema>;
export type Ngo = typeof ngosTable.$inferSelect;
export type AdoptablePet = typeof adoptablePetsTable.$inferSelect;
