import * as z from "zod";

export const formApplicationSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome must be at least 3 characters.")
    .max(100, "Nome must be at most 100 characters."),
  email: z
    .email("Email must be a valid email address.")
    .min(5, "Email must be at least 5 characters.")
    .max(100, "Email must be at most 100 characters."),
  empresa: z
    .string()
    .min(3, "Empresa must be at least 3 characters.")
    .max(100, "Empresa must be at most 100 characters."),
  motivo_participacao: z
    .string()
    .min(5, "Motivo de participação must be at least 5 characters.")
    .max(100, "Motivo de participação must be at most 100 characters."),
});
