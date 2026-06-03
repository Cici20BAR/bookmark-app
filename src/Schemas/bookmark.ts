import { z } from "zod";

const normalizeUrl = (value: string) => {
  const trimmed = value.trim();
  if (trimmed === "") return trimmed;
  const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed);
  return hasScheme ? trimmed : `http://${trimmed}`;
};

const urlSchema = z
  .string()
  .min(1, "URL este obligatoriu!")
  .transform(normalizeUrl)
  .refine((value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }, "Te rog introdu un URL valid!");

export const bookmarkSchema = z.object({
  title: z.string().min(1, "Titlul este obligatoriu!"),
  url: urlSchema,
  tags: z.array(z.string()).min(1, "Trebuie să adaugi măcar un tag!"),
  description: z.string().max(200, "S-a depasit ne caractere"),
});

export type BookmarkFormData = z.infer<typeof bookmarkSchema>;
