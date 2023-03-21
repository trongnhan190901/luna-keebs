import { Role } from '@prisma/client';
import { db } from './server/db';
import { getSession } from './server/session';

export const getCurrentUser = async () => {
    const session = await getSession();

    return session?.user;
};

export const isAdmin = async () => {
    const session = await getSession();
    if (!session?.user) return false;

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return !!db.user.findFirst({
        where: {
            id: session.user.id,
            role: Role.Admin,
        },
    });
};
