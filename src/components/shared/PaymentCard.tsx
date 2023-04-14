import type { ReactNode } from 'react';
import { dateFormat } from '~/helpers/dateFormat';
import { priceFormat } from '~/helpers/priceFormat';

interface PaymentCardProps {
    payment: {
        updatedAt: Date;
        totalAmount: bigint;
    };
    children: ReactNode;
}

const PaymentCard = ({ payment, children }: PaymentCardProps) => {
    return (
        <>
            <div className="h-full w-full bg-sky-400 font-primary text-2xl">
                <div>Thanh toán vào: {dateFormat(payment.updatedAt)}</div>
                <div>Tên người nhận: </div>
                <div>SĐT người nhận: </div>
                <div>Địa chỉ: </div>
                <div>Đơn hàng bao gồm: </div>
                {children}
                <div>
                    Tổng:{' '}
                    {priceFormat(parseInt(payment.totalAmount.toString()))}
                </div>
            </div>
        </>
    );
};

export default PaymentCard;
