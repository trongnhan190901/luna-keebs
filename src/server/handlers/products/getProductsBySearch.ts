import type { Prisma, PrismaClient } from '@prisma/client';
import { massageProductClientList } from '~/helpers/massageProductClient';
import { db } from '~/libs/server/db';

export const getProductsBySearch = async (
    search: string,
    take?: number,
    skip?: number,
    prisma?: PrismaClient<
        Prisma.PrismaClientOptions,
        never,
        Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
    >,
) => {
    const searchValues = search.split(' ');
    if (searchValues.length === 0) return [];
    const products = await (prisma ?? db).product.findMany({
        where: {
            deleted: false,
            OR: [
                {
                    AND: searchValues.flatMap((val) => [
                        {
                            name: {
                                contains: val,
                                mode: 'insensitive',
                            },
                        },
                    ]),
                },
                {
                    category: {
                        title: {
                            contains: search,
                            mode: 'insensitive',
                        },
                    },
                },
                {
                    AND: searchValues.flatMap((val) => [
                        {
                            category: {
                                name: {
                                    contains: val,
                                    mode: 'insensitive',
                                },
                            },
                        },
                    ]),
                },
            ],
        },
        include: {
            category: true,
            _count: {
                select: {
                    orderItems: true,
                },
            },
        },
        ...(take && { take }),
        ...(skip && { skip }),
    });
    return massageProductClientList(products);
};
