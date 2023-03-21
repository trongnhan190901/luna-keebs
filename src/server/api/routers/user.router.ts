import { userProcedure } from '../procedures';
import { router } from '../trpc';

export const userRouter = router({
    profile: userProcedure.query(async ({ ctx }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        return await ctx.prisma.user.findFirst({
            where: {
                id: ctx.session.user.id,
            },
        });
    }),
});
