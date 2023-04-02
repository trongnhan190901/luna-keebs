/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
    getProduct: publicProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { id } = input;

            return await ctx.prisma.product.findUnique({
                where: { id },
            });
        }),
    getAllProduct: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.string().nullish(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const limit = input.limit ?? 50;
            const { cursor } = input;

            const items = await ctx.prisma.product.findMany({
                take: limit + 1,
                where: {},
                cursor: cursor
                    ? {
                          id: cursor,
                      }
                    : undefined,
            });
            let nextCursor: typeof cursor | undefined = undefined;
            if (items.length > limit) {
                // Remove the last item and use it as next cursor

                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const nextItem = items.pop()!;
                nextCursor = nextItem.id;
            }

            return {
                items: items.reverse(),
                nextCursor,
            };
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
// export type GetProduct = ProductRouterOutput['get'];
