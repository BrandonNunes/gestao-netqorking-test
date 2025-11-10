import * as z from "zod";

export const fullApplicationformSchema = z.object({
  id_intencao: z.number("ID da intenção é obrigatório").int().positive(),
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
  telefone: z
    .string()
    .min(10, "Telefone must be at least 10 characters.")
    .max(15, "Telefone must be at most 15 characters."),
  rede_social: z
    .string()
    .min(3, "Rede social must be at least 3 characters.")
    .max(100, "Rede social must be at most 100 characters."),
  cpf_cnpj: z
    .string()
    .min(11, "CPF/CNPJ must be at least 11 characters.")
    .max(14, "CPF/CNPJ must be at most 14 characters."),
  descricao_habilidades: z
    .string()
    .min(3, "Descrição de habilidades must be at least 3 characters.")
    .max(300, "Descrição de habilidades must be at most 100 characters."),
});
