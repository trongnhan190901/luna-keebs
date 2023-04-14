/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { priceFormat } from '~/helpers/priceFormat';

interface PaymentCardItemProps {
    product: {
        slug: string;
        image: string;
        title: string;
        price: string;
    };
    cartQuantity: number;
}

const PaymentCardItem = ({ product, cartQuantity }: PaymentCardItemProps) => {
    const total = priceFormat(parseInt(product.price) * cartQuantity);

    return (
        <>
            <Link className="mt-2 outline-0" href={`/product/${product?.slug}`}>
                <img
                    src={`https://${product.image}`}
                    alt=""
                    className="absolute-center h-48 w-56 rounded-xl object-cover"
                />

                <h2 className="text-4xl font-bold hover:text-blue-500">
                    {product?.title}
                </h2>
            </Link>
            <div>{cartQuantity}</div>
            <div>{total}</div>
        </>
    );
};

export default PaymentCardItem;
