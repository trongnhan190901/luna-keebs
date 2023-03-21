/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Prisma, PrismaClient } from '@prisma/client';
import { db } from '~/libs/server/db';

export const getOrder = async (
    orderId: string,
    userId: string,
    prisma?: PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >,
) => {
    const order = await (prisma ?? db).order.findFirst({
        where: {
            id: orderId,
            userId,
        },
        select: {
            id: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            orderItems: {
                include: {
                    product: {
                        select: {
                            id: true,
                            price: true,
                            title: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });
    if (!order) return;
    return {
        ...order,
        orderItems: order.orderItems.map((item) => ({
            ...item,
        })),
    };
};
