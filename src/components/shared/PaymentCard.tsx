import type { Payment } from '@prisma/client';
import type { ReactNode } from 'react';
import { dateFormat } from '~/helpers/dateFormat';
import { priceFormat } from '~/helpers/priceFormat';

interface PaymentCardProps {
    payment: Payment;
    children: ReactNode;
}

const PaymentCard = ({ payment, children }: PaymentCardProps) => {
    return (
        <>
            <div className="mb-12 h-full w-full space-y-3 rounded-2xl border-2 border-black p-6 font-primary text-3xl">
                <div>
                    <b>Đơn hàng:</b> {payment.id}
                </div>
                <div>
                    <b>Thanh toán vào:</b> {dateFormat(payment.updatedAt)}
                </div>
                {/* <div>
                    {' '}
                    <b>Tên người nhận:</b>{' '}
                </div>
                <div>
                    {' '}
                    <b>SĐT người nhận:</b>{' '}
                </div>
                <div>
                    {' '}
                    <b>Địa chỉ: </b>
                </div> */}
                <div>
                    {' '}
                    <b>Đơn hàng bao gồm:</b>{' '}
                </div>
                <div className="flex w-full flex-col space-y-6">{children}</div>
                <div className="text-end text-3xl">
                    <b>Tổng: </b>
                    {priceFormat(parseInt(payment.totalAmount.toString()))}
                </div>
            </div>
        </>
    );
};

export default PaymentCard;
