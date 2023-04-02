import type { Prisma, PrismaClient } from '@prisma/client';
import { massageProductClientList } from '~/helpers/massageProductClient';
import { db } from '~/libs/server/db';

export const fetchProductSuggestions = async ({
    prisma,
    categoryName,
    skipProductId,
    limit,
}: {
    prisma?: PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >;
    categoryId: string;
    skipProductId?: string;
    limit?: number;
}) => {
    const products = await (prisma ?? db).product.findMany({
        where: {
            categoryName,
            ...(skipProductId && {
                NOT: {
                    id: skipProductId,
                },
            }),
            deleted: false,
        },
        ...(limit && { take: limit }),
        include: {
            category: true,
            _count: {
                select: {
                    orderItems: true,
                },
            },
        },
    });
    return massageProductClientList(products);
};
