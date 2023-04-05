import { Product } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useCartContext } from '~/providers/CartContextProvider';
import type { ProductPreview } from '~/types';

export default function useIsAddToCart({ product }: { product?: Product }) {
    const cartCtx = useCartContext();
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        if (
            cartCtx?.userWithCart?.cart &&
            product &&
            Array.isArray(cartCtx?.userWithCart?.cart)
        ) {
            setIsAdded(
                cartCtx?.userWithCart?.cart.some(
                    (el) => el.productId === product.id,
                ),
            );
        }

        return () => {
            setIsAdded(false);
        };
    }, [cartCtx?.userWithCart?.cart, product]);

    return isAdded;
}
