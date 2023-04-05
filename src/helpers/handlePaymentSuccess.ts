/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { db } from './../libs/server/db';

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
            data: { orderId, status: 'SUCCESS' },
        }),
    ]);

    const payments = paymentsWithResult?.value;
    const userId = payments[0].userId;

    // // delete all records of cart & enroll course;
    // await Promise.allSettled([
    //     await prisma.student.upsert({
    //         where: { userId: payments[0].userId },
    //         update: {
    //             courses: {
    //                 connect: payments.map((payment) => ({
    //                     id: payment.courseId,
    //                 })),
    //             },
    //         },
    //         create: {
    //             userId: payments[0].userId,
    //             courses: {
    //                 connect: payments.map((payment) => ({
    //                     id: payment.courseId,
    //                 })),
    //             },
    //         },
    //     }),
    //     await prisma.cart.deleteMany({ where: { userId } }),
    // ]);

    // // create revenues for instructors:
    // await Promise.all(
    //     payments.map(async (payment) => {
    //         await prisma.revenue.create({
    //             data: {
    //                 amount: BigInt(payment.course.coursePrice),
    //                 user: { connect: { id: payment.course.instructor.id } },
    //             },
    //         });
    //     }),
    // );
}
