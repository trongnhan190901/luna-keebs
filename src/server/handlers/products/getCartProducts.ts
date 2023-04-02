import type { Prisma, PrismaClient } from '@prisma/client';
import type { CartProductsInput } from '~/helpers/validations/productRoutesSchema';
import { massageProductClientList } from '~/helpers/massageProductClient';
import { db } from '~/libs/server/db';

export const getCartProducts = async (
    products: CartProductsInput,
    prisma?: PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >,
) => {
    if (products.length === 0) return [];
    const data = await (prisma ?? db).product.findMany({
        where: {
            deleted: false,
            OR: products.map((product) => ({
                id: product.id,
                quantity: {
                    gt: 0,
                },
            })),
        },
        include: {
            category: true,
            _count: {
                select: {
                    orderItems: true,
                },
            },
        },
    });
    return massageProductClientList(data);
};
