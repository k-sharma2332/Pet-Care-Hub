import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const vaccinationsTable = pgTable("vaccinations", {
  id: serial("id").primaryKey(),
  petId: integer("pet_id").notNull(),
  vaccineName: text("vaccine_name").notNull(),
  administeredAt: text("administered_at").notNull(),
  nextDueAt: text("next_due_at"),
  vetName: text("vet_name"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVaccinationSchema = createInsertSchema(vaccinationsTable).omit({ id: true, createdAt: true });
export type InsertVaccination = z.infer<typeof insertVaccinationSchema>;
export type Vaccination = typeof vaccinationsTable.$inferSelect;
