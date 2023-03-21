import { productRouter } from './routers/product.router';
import { router } from '~/server/api/trpc';
import { userRouter } from './routers/user.router';
import { adminRouter } from './routers/admin.router';
import { orderRouter } from './routers/order.router';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
    user: userRouter,
    admin: adminRouter,
    product: productRouter,
    // payment: paymentRouter,
    order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
