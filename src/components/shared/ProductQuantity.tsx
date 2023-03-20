import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Product } from '@prisma/client';
import { memo } from 'react';

interface ProductQuantityProps {
    product: Product;
}

const ProductQuantity = ({ product }: ProductQuantityProps) => {
    console.log(product);

    return (
        <>
            <div className="flex w-full items-center justify-start">
                <button className="absolute-center group h-12 w-12 cursor-pointer rounded-tl-lg rounded-bl-lg border bg-white hover:bg-gray-700">
                    <MinusIcon className="h-7 w-7 group-hover:stroke-white" />
                </button>

                <span className="absolute-center h-12 w-20 border text-center font-primary text-[1.7rem] font-bold"></span>

                <button className="absolute-center group h-12 w-12 cursor-pointer rounded-tr-lg rounded-br-lg border bg-white hover:bg-gray-700">
                    <PlusIcon className="h-7 w-7 group-hover:stroke-white" />
                </button>
            </div>
        </>
    );
};

export default memo(ProductQuantity);
