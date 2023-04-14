import { z } from 'zod';

export const paginatedInputSchema = z.object({
    take: z.number(),
    cursor: z.string().optional(),
});

export const createAddressInputSchema = z.object({
    name: z.string().min(2),
    phone: z.string().min(10),
    home: z.string().min(10),
    province: z.string(),
    district: z.string(),
    ward: z.string(),
});

export type CreateAddressInput = z.infer<typeof createAddressInputSchema>;
