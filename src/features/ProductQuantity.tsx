import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { memo } from 'react';
import useShoppingCart from '~/context/ShoppingCartContext';
import { ProductPreview } from '~/types';

interface ProductQuantityProps {
    product: ProductPreview;
}

const ProductQuantity = ({ product }: ProductQuantityProps) => {
    const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity } =
        useShoppingCart();

    const quantity = getItemQuantity(product.id);

    return (
        <>
            <div className="flex w-full items-center justify-start">
                <button
                    onClick={() => decreaseItemQuantity(product.id)}
                    className="absolute-center group h-12 w-12 cursor-pointer rounded-tl-lg rounded-bl-lg border bg-white hover:bg-gray-700"
                >
                    <MinusIcon className="h-7 w-7 group-hover:stroke-white" />
                </button>

                <span className="absolute-center h-12 w-20 border text-center font-primary text-[1.7rem] font-bold">
                    {quantity}
                </span>

                <button
                    onClick={() => increaseItemQuantity(product.id)}
                    className="absolute-center group h-12 w-12 cursor-pointer rounded-tr-lg rounded-br-lg border bg-white hover:bg-gray-700"
                >
                    <PlusIcon className="h-7 w-7 group-hover:stroke-white" />
                </button>
            </div>
        </>
    );
};

export default memo(ProductQuantity);
