/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { inferRouterOutputs } from '@trpc/server';
import { date, z } from 'zod';
import { createProductInputSchema } from '~/helpers/validations/productRoutesSchema';
import { getPreSignedUrl } from '~/server/handlers/s3/getPreSignedUrl';
import { adminProcedure } from '~/server/api/procedures';
import { router } from '~/server/api/trpc';
import slugify from 'slugify';
import { SHIPPING_STATUS, TICKET_STATUS } from '@prisma/client';
import id from 'date-fns/locale/id';

function getDaysInMonth(month: number, year: number) {
    return new Date(month, year, 0).getDate();
}

export const adminRouter = router({
    getSignedUrl: adminProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .mutation(async ({ input }) => getPreSignedUrl(input.id)),

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
    findAllPayment: adminProcedure
        .input(z.object({ includeProduct: z.boolean() }))
        .query(async ({ ctx, input }) => {
            const { includeProduct } = input;

            const payments = ctx.prisma.payment.findMany({
                select: {
                    id: true,
                    updatedAt: true,
                    totalAmount: true,
                    shippingStatus: true,
                    status: true,
                    name: true,
                    phone: true,
                    address: true,
                    paymentDetails: {
                        include: {
                            product: includeProduct
                                ? {
                                      select: {
                                          id: true,
                                          slug: true,
                                          image: true,
                                          title: true,
                                          price: true,
                                      },
                                  }
                                : includeProduct,
                        },
                    },
                },
            });

            return payments;
        }),
    updateShipping: adminProcedure
        .input(
            z.object({
                id: z.string(),
                status: z.nativeEnum(SHIPPING_STATUS),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { id, status } = input;

            const ticket = await ctx.prisma.payment.update({
                where: { id },
                data: {
                    updatedAt: new Date(),
                    shippingStatus: status,
                },
            });

            return ticket;
        }),
    findAllTicket: adminProcedure.query(async ({ ctx }) => {
        const allTicket = ctx.prisma.ticket.findMany({
            select: {
                id: true,
                desc: true,
                note: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                ticketIssueName: true,
                payment: {
                    select: {
                        id: true,
                        updatedAt: true,
                    },
                },
                product: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });

        return allTicket;
    }),
    updateTicket: adminProcedure
        .input(
            z.object({
                id: z.string(),
                note: z.string().optional(),
                status: z.nativeEnum(TICKET_STATUS),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { id, note, status } = input;

            const ticket = await ctx.prisma.ticket.update({
                where: { id },
                data: {
                    updatedAt: new Date(),
                    note,
                    status,
                },
            });

            return ticket;
        }),

    findRevenue: adminProcedure.query(async ({ ctx }) => {
        const revenue = ctx.prisma.payment.aggregateRaw({
            pipeline: [
                {
                    $match: {
                        status: 'SUCCESS',
                    },
                },
                {
                    $group: {
                        _id: {
                            month: { $month: '$createdAt' },
                            year: { $year: '$createdAt' },
                        },
                        totalAmount: { $sum: '$totalAmount' },
                    },
                },
            ],
        });
        return revenue;
    }),
});

type AdminRouterOutput = inferRouterOutputs<typeof adminRouter>;
export type CreateProductResponse = AdminRouterOutput['createProduct'];
export type UpdateProductResponse = AdminRouterOutput['updateProduct'];
export type DeleteProductResponse = AdminRouterOutput['deleteProduct'];
export type CategoryListResponse = AdminRouterOutput['getCategoryList'];
