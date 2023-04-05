/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Cart } from '@prisma/client';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import React, { createContext, useContext, useMemo } from 'react';
import toast from 'react-hot-toast';
import { logInState } from '~/atoms/modalAtom';
import Login from '~/components/partials/Login';
import { cartsSchema } from '~/helpers/validations/cartItemSchema';
import useLocalStorage from '~/hooks/useLocalStorage';
import type { CartItem } from '~/types';
import { api } from '~/utils/api';

interface CartContextType {
    userWithCart?: {
        cart: Cart[];
    } | null;
    refetchData: () => void;
    addProductToCart: (productId: string, cartQuantity: number) => void;
    // status: 'error' | 'success' | 'loading';
    // addCourseToCartStatus: 'error' | 'success' | 'idle' | 'loading';
    // checkoutState: 'error' | 'success' | 'loading' | 'idk';
    // handleCheckout: () => Promise<void>;
    // totalAmount: number;
}

interface CartContextValues {
    userWithCart?: {
        cart: Cart[];
    } | null;
    // refetchData: () => void;
    addProductToCart: (productId: string, cartQuantity: number) => void;
}
export const CartContext = createContext<CartContextValues | null>(null);

export const useCartContext = () => useContext(CartContext);

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: userWithCart, status } = api.user.findCartByUser.useQuery({
        includeProduct: true,
    });

    const { mutate: addProductToCartMutate, status: addProductToCartStatus } =
        api.user.addProductToCart.useMutation();

    const addProductToCart = (productId: string, cartQuantity: number) => {
        addProductToCartMutate({ productId, cartQuantity });
    };

    const totalAmount = useMemo(() => {
        if (!userWithCart) return 0;

        return userWithCart.cart.reduce((acc, curr) => {
            if (!curr.product.price) return acc;

            const totalItemPrice =
                curr.cartQuantity * parseInt(curr.product.price);

            return acc + totalItemPrice;
        }, 0);
    }, [userWithCart]);
    // useEffect(() => {
    //     if (addCourseToCartStatus === 'success') {
    //         toast.success('Thêm vào giỏ hàng thành công!');
    //         refetchData();
    //     }

    //     if (addCourseToCartStatus === 'error') {
    //         toast.error('Thêm vào giỏ hàng thất bạn! Thử lại sau!');
    //     }
    // }, [addCourseToCartStatus]);

    return (
        <CartContext.Provider
            value={{
                userWithCart,
                addProductToCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
