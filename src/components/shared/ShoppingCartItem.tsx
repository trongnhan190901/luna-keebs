/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Product } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FeaturedItem } from '~/constants';
import { useCartContext } from '~/providers/CartContextProvider';
import { CartItem } from '~/types';

interface CartItemProps {
    product: Product;
    index: number;
}

const ShoppingCartItem = ({ product, index }: CartItemProps) => {
    const { cartItems, setCartItems } = useCartContext();

    console.log(index, product);

    const [isDeleting, setIsDeleting] = useState(false);
    const handleRemove = () => {
        setIsDeleting(true);
        setCartItems([...cartItems.filter((_, idx) => idx !== index)]);
        setTimeout(() => {
            setIsDeleting(false);
            // toast.success('Item successfully removed!');
        }, 200);
    };

    return (
        <>
            <div className="mx-14 flex h-full w-full flex-col pt-8">
                <div className="flex w-full flex-row border-b px-14 pb-14 pt-8">
                    <img
                        src={`https://${product.image}`}
                        alt=""
                        className="absolute-center h-40 w-40 object-cover"
                    />
                    <div className="mt-2 w-full px-6 font-primary font-bold text-gray-700">
                        <div className="flex w-full">
                            <Link href={`/product/${product?.slug}`}>
                                <h2 className="w-full text-4xl hover:scale-105">
                                    {product?.title}
                                </h2>
                            </Link>

                            <div
                                className="flex w-full justify-end"
                                onClick={() => handleRemove()}
                            >
                                <XMarkIcon className="smooth-effect h-10 w-10 stroke-gray-400 hover:scale-105 hover:stroke-black" />
                            </div>
                        </div>
                        <p className="mt-3 text-2xl">
                            Category: {product?.categoryName}
                        </p>
                        <div className="mt-6 flex">
                            <div className="flex w-full items-center justify-start">
                                {/* <ProductQuantity product={item} /> */}
                            </div>
                            <div className="flex w-full items-center justify-end font-secondary text-[1.7rem] font-bold">
                                ₫ {product?.price}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShoppingCartItem;
