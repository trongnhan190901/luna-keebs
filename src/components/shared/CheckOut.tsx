/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { useCartContext } from '~/providers/CartContextProvider';

export default function CheckOut() {
    const cartCtx = useCartContext();

    const handleCheckout = async () => {
        await cartCtx?.handleCheckout();
    };

    if (!cartCtx?.totalAmount || cartCtx?.totalAmount === 0) {
        return null;
    }

    return (
        <div>
            <button
                onClick={handleCheckout}
                disabled={cartCtx?.checkoutState === 'loading'}
                className="absolute-center smooth-effect mt-4 h-[5.5rem] w-[300px] rounded-lg bg-gray-600 font-secondary text-2xl font-bold text-white hover:scale-105 hover:bg-black"
            >
                {/* {cartCtx?.checkoutState === 'loading' ? (
                    <Loading />
                ) : (
                    'Thanh toán'
                )} */}
                Thanh toán
            </button>
        </div>
    );
}
