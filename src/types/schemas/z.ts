import {z} from "zod";

export const companyRegisterSchema = z.object({
        nome: z.string().min(1, "Nome é obrigatório"),
        tel: z.string().min(10, "Telefone inválido"),
        cnpj: z.string().min(14, "CNPJ inválido"),
        state: z.string().min(1, "Estado é obrigatório"),
        street: z.string().min(1, "Rua é obrigatória"),
        number: z.string().min(1, "Número é obrigatório"),
        city: z.string().min(1, "Cidade é obrigatória"),
    })
;

export const userRegisterSchema = z
    .object({
        username: z.string().min(1, "Username é obrigatório"),
        email: z.string().email("E-mail inválido"),
        password: z.string().min(6, "A senha não pode ser menor que 6 characteres"),
        confirmPassword: z
            .string()
            .min(6, "A confirmação da senha não pode ser menor que 6 characteres"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não conferem",
        path: ["confirmPassword"],
    });