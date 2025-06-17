import { z } from "zod";

export const upsertPatientSchema = z.object({
  id: z.string().uuid().optional(),
  email: z.string().email({ message: "Email inválido." }),
  name: z.string().trim().min(1, { message: "Nome é obrigatório." }),
  sex: z.enum(["male", "female"], { required_error: "Sexo é obrigatório." }),
  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: "Número de telefone é obrigatório." }),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;
