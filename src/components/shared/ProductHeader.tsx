/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useCartContext } from '~/providers/CartContextProvider';
import ProductQuantity from './ProductQuantity';
import type { Product } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useAtom } from 'jotai';
import { logInState } from '~/atoms/modalAtom';
import Login from '../partials/Login';

interface ProductHeaderProps {
    product: Product;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
    const [count, setCount] = useState<number>(1);
    const { status: sessionStatus } = useSession();
    const [isLogin, setIsLogin] = useAtom(logInState);
    const cartCtx = useCartContext();

    const getData = (data: number) => {
        setCount(data);
    };

    const handleAddToCart = () => {
        if (sessionStatus === 'unauthenticated') {
            setIsLogin(!isLogin);
        }

        if (!product || !cartCtx?.userWithCart) return;

        cartCtx?.addProductToCart(product.id, count);
    };

    return (
        <>
            <div className=" flex h-full w-[90%] flex-row items-start justify-center">
                <Login />
                <div className="mx-24 h-full w-[1000px]">
                    <img
                        src={`https://${product.image}`}
                        alt=""
                        className="h-[650px] w-[1000px] rounded-3xl object-cover"
                    />
                </div>
                <div className="mx-4 h-full">
                    <h1
                        className="mt-8 font-secondary text-7xl
                         font-bold"
                    >
                        {product?.title}
                    </h1>
                    <div className="ml-12 mt-12 mb-20 font-primary text-4xl font-bold text-teal-500">
                        ₫ {product?.price}
                    </div>

                    <div className="mb-2 font-secondary text-3xl font-medium text-gray-900">
                        Số lượng
                    </div>
                    <div className="my-4 flex w-full items-center justify-start">
                        <ProductQuantity sendData={getData} />
                    </div>

                    <button
                        onClick={() => handleAddToCart()}
                        className="absolute-center my-8 h-20 w-96 overflow-hidden rounded-xl border-2 border-black font-secondary text-3xl font-medium text-black hover:bg-black hover:text-white"
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductHeader;
