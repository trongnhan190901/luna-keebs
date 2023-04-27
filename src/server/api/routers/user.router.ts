/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from 'zod';
import { userProcedure } from '../procedures';
import { router } from '../trpc';
import { createAddressInputSchema } from '~/helpers/validations/userRoutesSchema';

export const userRouter = router({
    profile: userProcedure.query(async ({ ctx }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        return await ctx.prisma.user.findFirst({
            where: {
                id: ctx.session.user.id,
            },
        });
    }),
    addProductToCart: userProcedure
        .input(
            z.object({
                productId: z.string(),
                cartQuantity: z.number(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { productId, cartQuantity } = input;

            const user = await ctx.prisma.user.update({
                where: { id: ctx.session.user.id },
                data: {
                    cart: {
                        create: {
                            product: { connect: { id: productId } },
                            cartQuantity: cartQuantity,
                        },
                    },
                },
            });
            return user;
        }),
    deleteProductFromCart: userProcedure
        .input(z.object({ cartId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { cartId } = input;

            const deletedCart = await ctx.prisma.cart.delete({
                where: { id: cartId },
            });

            return deletedCart;
        }),
    findCartByUser: userProcedure
        .input(z.object({ includeProduct: z.boolean() }))
        .query(async ({ ctx, input }) => {
            const { includeProduct } = input;

            const user = await ctx.prisma.user.findUnique({
                where: { id: ctx.session.user.id },
                select: {
                    cart: {
                        include: {
                            product: includeProduct
                                ? {
                                      select: {
                                          slug: true,
                                          image: true,
                                          title: true,
                                          price: true,
                                          categoryName: true,
                                      },
                                  }
                                : includeProduct,
                        },
                        orderBy: { createdAt: 'desc' },
                    },
                },
            });

            return user;
        }),
    findPayments: userProcedure
        .input(z.object({ includeProduct: z.boolean() }))
        .query(async ({ ctx, input }) => {
            const { includeProduct } = input;

            const payments = ctx.prisma.payment.findMany({
                where: { userId: ctx.session.user.id, status: 'SUCCESS' },
                select: {
                    id: true,
                    updatedAt: true,
                    totalAmount: true,
                    shippingStatus: true,
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
    createTicket: userProcedure
        .input(
            z.object({
                issueName: z.string(),
                desc: z.string(),
                paymentId: z.string(),
                productId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { issueName, desc, paymentId, productId } = input;

            const user = await ctx.prisma.user.update({
                where: { id: ctx.session.user.id },
                data: {
                    ticket: {
                        create: {
                            payment: { connect: { id: paymentId } },
                            product: { connect: { id: productId } },
                            ticketIssue: { connect: { name: issueName } },
                            desc: desc,
                        },
                    },
                },
            });
            return user;
        }),
    getTicketIssue: userProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.ticketIssue.findMany({
            select: {
                id: true,
                name: true,
            },
        });
    }),
    findTickets: userProcedure
        .input(
            z.object({
                includeProduct: z.boolean(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const tickets = ctx.prisma.ticket.findMany({
                where: { userId: ctx.session.user.id },
                select: {
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
            return tickets;
        }),
});
