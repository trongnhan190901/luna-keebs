/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { inferRouterOutputs } from '@trpc/server';
import { z } from 'zod';
import { PRODUCTS_PER_PAGE } from '~/constants';
import { getCartProductsInputSchema } from '~/helpers/validations/productRoutesSchema';
import { fetchProductById } from '~/server/handlers/products/fetchProductById';
import { getCartProducts } from '~/server/handlers/products/getCartProducts';
import { searchProductsSchema } from '~/helpers/validations/productRoutesSchema';
import { getProductsBySearch } from '~/server/handlers/products/getProductsBySearch';
import { router, publicProcedure } from '~/server/api/trpc';

export const productRouter = router({
    get: publicProcedure
        .input(z.string().optional())
        .query(async ({ ctx, input: id }) => {
            if (!id) return;
            return fetchProductById(id, ctx.prisma);
        }),
    search: publicProcedure
        .input(searchProductsSchema)
        .query(async ({ ctx, input }) => {
            const { search, page } = input;
            if (!search) return [];
            return getProductsBySearch(
                search,
                PRODUCTS_PER_PAGE,
                (page - 1) * PRODUCTS_PER_PAGE,
                ctx.prisma,
            );
        }),
    carts: publicProcedure
        .input(getCartProductsInputSchema)
        .query(async ({ ctx, input }) => {
            return getCartProducts(input, ctx.prisma);
        }),
});

type ProductRouterOutput = inferRouterOutputs<typeof productRouter>;
export type GetProduct = ProductRouterOutput['get'];
