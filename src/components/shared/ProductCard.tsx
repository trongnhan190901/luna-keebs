/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
    product: {
        image: string;
        title: string;
        slug: string;
        price: string;
    };
}

const ProductCard = ({ product }: ProductCardProps) => {
    return (
        <>
            <Link href={`/product/${product.slug}`}>
                <div className="smooth-effect mx-6 h-[280px] w-[150px] rounded-3xl pt-5 transition ease-in-out hover:-translate-y-1 hover:scale-105 md:h-[310px] md:w-[220px] lg:h-[400px] lg:w-[250px] 2xl:w-[290px]">
                    <img
                        src={`https://${product.image}`}
                        className="z-0 h-[150px] w-[150px] rounded-3xl bg-contain object-cover md:h-[180px] md:w-[220px] lg:h-[260px] lg:w-[290px]"
                        alt=""
                    />

                    <div className="absolute-center mt-4 flex w-full flex-col px-6 text-center font-tertiary">
                        <h2 className="h-[30px] font-secondary text-3xl font-semibold leading-tight line-clamp-2">
                            {product.title}
                        </h2>
                        <span className="mt-2 font-primary text-3xl leading-tight">
                            ₫ {product.price}
                        </span>
                    </div>
                </div>
            </Link>
        </>
    );
};
export default ProductCard;
