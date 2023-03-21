import { z } from 'zod';
import { LIMIT_SEARCH_INPUT } from '../../constants';

export const searchProductsSchema = z.object({
    search: z.string().max(LIMIT_SEARCH_INPUT),
    page: z.number(),
});

export const getCartProductsInputSchema = z
    .array(
        z.object({
            id: z.string().max(30),
        }),
    )
    .max(5);

export type CartProductsInput = z.infer<typeof getCartProductsInputSchema>;

export const createProductInputSchema = z.object({
    title: z.string().min(5).max(50),
    image: z.string().min(5).max(500),
    desc: z.string().max(500),
    type: z.string(),
    categoryName: z.string(),
    spec: z.string().min(500),
    quantity: z.number().min(10),
    price: z.number().min(100),
});

export type CreateProductsInput = z.infer<typeof createProductInputSchema>;
