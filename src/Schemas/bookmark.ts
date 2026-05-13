import { z } from "zod";
export const bookmarkSchema = z.object({
  title: z.string().min(1, "Titlul este obligatoriu!"),
  url: z.string().url("Te rog introdu un URL valid!"),
  tags: z.array(z.string()).min(1, "Trebuie să adaugi măcar un tag!"),
  description:z.string().max(200,"S-a depasit ne caractere"),
});
  export type BookmarkFormData = z.infer<typeof bookmarkSchema>;
