/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { inferRouterOutputs } from '@trpc/server';
import { z } from 'zod';
import { createProductInputSchema } from '~/helpers/validations/productRoutesSchema';
import { paginatedInputSchema } from '~/helpers/validations/userRoutesSchema';
import { getAllOrders } from '~/server/handlers/admin/getAllOrder';
import { fetchPaginatedProducts } from '~/server/handlers/products/fetchPaginatedProducts';
import { getPreSignedUrl } from '~/server/handlers/s3/getPreSignedUrl';
import { adminProcedure } from '~/server/api/procedures';
import { router } from '~/server/api/trpc';
import slugify from 'slugify';

export enum Sort {
    Desc = 'Desc',
    Asc = 'Asc',
    PriceUp = 'PriceUp',
    PriceDown = 'PriceDown',
}

export const adminRouter = router({
    getProductsInfo: adminProcedure
        .input(
            paginatedInputSchema.extend({
                sort: z.nativeEnum(Sort),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { take, cursor, sort } = input;
            const products = await fetchPaginatedProducts(
                ctx.prisma,
                sort,
                take,
                cursor,
            );
            return {
                products,
                cursor: products[take - 1]?.id,
            };
        }),
    getOrdersInfo: adminProcedure
        .input(paginatedInputSchema)
        .query(async ({ ctx, input }) => {
            const { take, cursor } = input;
            return getAllOrders(take, cursor, ctx.prisma);
        }),
    getSignedUrl: adminProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .mutation(async ({ input }) => getPreSignedUrl(input.id)),

    getCategoryList: adminProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.category.findMany({
            select: {
                id: true,
                name: true,
            },
        });
    }),
    createProduct: adminProcedure
        .input(createProductInputSchema)
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.product.create({
                data: {
                    ...input,
                    slug: slugify(input.title, { lower: true }),
                },
            });
        }),
    updateProduct: adminProcedure
        .input(
            createProductInputSchema.extend({
                id: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { id, ...updateData } = input;
            return await ctx.prisma.product.update({
                where: {
                    id,
                },
                data: {
                    ...updateData,
                    updatedAt: new Date(),
                },
            });
        }),
    deleteProduct: adminProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.product.update({
                where: {
                    id: input.id,
                },
                data: {
                    deleted: true,
                    updatedAt: new Date(),
                },
            });
        }),
});

type AdminRouterOutput = inferRouterOutputs<typeof adminRouter>;
export type ProductsInfoResponse = AdminRouterOutput['getProductsInfo'];
export type OrdersInfoResponse = AdminRouterOutput['getOrdersInfo'];
export type CreateProductResponse = AdminRouterOutput['createProduct'];
export type UpdateProductResponse = AdminRouterOutput['updateProduct'];
export type DeleteProductResponse = AdminRouterOutput['deleteProduct'];
export type CategoryListResponse = AdminRouterOutput['getCategoryList'];
