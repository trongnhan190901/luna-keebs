/* eslint-disable indent */
import slugify from 'slugify';
import { z } from 'zod';
import prisma from '~/libs/prismadb';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const productRouter = createTRPCRouter({
    createProduct: publicProcedure
        .input(
            z.object({
                title: z.string(),
                image: z.string(),
                type: z.string(),
                price: z.string(),
                quantity: z.string(),
                spec: z.string(),
                desc: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            return await prisma.product.create({
                data: { ...input, slug: slugify(input.title, { lower: true }) },
            });
        }),

    getAllProduct: publicProcedure
        .input(
            z.object({
                limit: z.number().min(1).max(100).nullish(),
                cursor: z.string().nullish(),
            }),
        )
        .query(async ({ input }) => {
            const limit = input.limit ?? 50;
            const { cursor } = input;

            const items = await prisma.product.findMany({
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

    getProduct: publicProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .query(async ({ input }) => {
            const { id } = input;

            return await prisma.product.findUnique({
                where: { id },
            });
        }),

    updateProduct: publicProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string(),
                image: z.string(),
                type: z.string(),
                price: z.string(),
                quantity: z.string(),
                spec: z.string(),
                desc: z.string(),
            }),
        )
        .mutation(async ({ input }) => {
            const { id, ...rest } = input;

            return await prisma.product.update({
                where: { id },
                data: { ...rest },
            });
        }),
    deleteProduct: publicProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .query(async ({ input }) => {
            const { id } = input;

            return await prisma.product.delete({
                where: { id },
            });
        }),
});
