import { z } from "zod";

const entitySchema = z.object({
    contactName: z.string(),
    address: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
});

// Esquema para estimateItem
const estimateItemSchema = z.object({
    name: z.string(),
    type: z.string(),
    value: z.number(),
    quantity: z.number(),
});

// Esquema para estimateProps
export const estimatePropsSchema = z.object({
    number: z.number(),
    date: z.string(), // Se você precisar validar a data, pode usar z.date() ou uma expressão regular com z.string().regex()
    company: z.object({
        businessName: z.string(),
        contactName: z.string().optional(),
        website: z.string().url().optional(),
        address: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        cnpj: z.string(), // Adicione validação específica para CNPJ se necessário
        img: z.string().optional(),
    }),
    client: entitySchema,
    items: z.array(estimateItemSchema),
    discountPercentage: z.number().optional(),
});
