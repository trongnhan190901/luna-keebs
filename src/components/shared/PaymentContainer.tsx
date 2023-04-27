/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { TicketIcon } from '@heroicons/react/24/outline';
import { api } from '~/utils/api';
import TicketModal from '../modal/TicketModal';
import Loader from './Loader';
import PaymentCard from './PaymentCard';
import PaymentCardItem from './PaymentCardItem';
import { useAtom } from 'jotai';
import { ticketState } from '~/atoms/modalAtom';
import { useState } from 'react';

const PaymentContainer = () => {
    const {
        data: payments,
        status: loadStatus,
        refetch,
    } = api.user.findPayments.useQuery({
        includeProduct: true,
    });

    const [isOpen, setIsOpen] = useAtom(ticketState);
    const [productItemId, setProductItemId] = useState();
    const [paymentItemId, setPaymentItemId] = useState();

    const openModal = (product: object, payment: object) => {
        setIsOpen(!isOpen);
        setProductItemId(product.id);
        setPaymentItemId(payment.id);
    };

    return (
        <>
            {loadStatus === 'loading' ? (
                <div className="absolute-center min-h-[10rem] w-full">
                    <Loader />
                </div>
            ) : (
                <div className="mx-auto w-4/5">
                    <ul className="flex flex-col space-y-4">
                        {payments && payments.length > 0 ? (
                            payments.map((payment, index) => {
                                return (
                                    <PaymentCard key={index} payment={payment}>
                                        {payment.paymentDetails.map(
                                            (detail, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex"
                                                    >
                                                        <PaymentCardItem
                                                            product={
                                                                detail.product
                                                            }
                                                            cartQuantity={
                                                                detail.cartQuantity
                                                            }
                                                        />
                                                        <div>
                                                            <TicketIcon
                                                                onClick={() =>
                                                                    openModal(
                                                                        detail.product,
                                                                        payment,
                                                                    )
                                                                }
                                                                className="h-12 w-12 hover:-translate-y-1 hover:scale-110 hover:cursor-pointer"
                                                            />
                                                        </div>
                                                        <TicketModal
                                                            productId={
                                                                productItemId
                                                            }
                                                            paymentId={
                                                                paymentItemId
                                                            }
                                                        />
                                                    </div>
                                                );
                                            },
                                        )}
                                    </PaymentCard>
                                );
                            })
                        ) : (
                            <li className="text-3xl">
                                Bạn chưa mua sản phẩm nào
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </>
    );
};

export default PaymentContainer;
