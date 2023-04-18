/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { db } from '~/libs/server/db';

interface handlePaymentSuccessParams {
    paymentGId: string;
    orderId: string;
    amount: number;
}

export default async function handlePaymentSuccess({
    paymentGId,
    orderId,
}: handlePaymentSuccessParams) {
    //update & find payment table:
    const [paymentsWithResult] = await Promise.allSettled([
        await db.payment.findMany({
            where: { paymentGId },
        }),
        await db.payment.updateMany({
            where: { paymentGId },
            data: {
                orderId,
                status: 'SUCCESS',
            },
        }),
    ]);

    const payments = paymentsWithResult?.value;
    const userId = payments[0].userId;

    // delete all records of cart
    await Promise.allSettled([await db.cart.deleteMany({ where: { userId } })]);
}
