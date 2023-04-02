/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @next/next/no-img-element */
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { Product } from '@prisma/client';
import { db } from '~/libs/server/db';
import { useCartContext } from '~/providers/CartContextProvider';
import { useState } from 'react';

interface DetailsPageProps {
    product: Product;
}

const DetailsPage = ({ product }: DetailsPageProps) => {
    const { id, title, image } = product;
    const { cartItems, setCartItems } = useCartContext();
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = () => {
        setIsLoading(true);
        setCartItems([
            ...cartItems,
            {
                id,
                title,
                image,
            },
        ]);

        setTimeout(() => {
            setIsLoading(false);
        }, 200);
    };
    console.log(cartItems);

    return (
        <>
            <div className="full-size mt-20 mb-24 flex flex-col items-start justify-center">
                <div className=" flex h-full w-[90%] flex-row items-start justify-center">
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
                            <select
                                className="h-16 w-28 rounded-xl border-2 border-black text-center font-primary text-3xl font-bold focus:outline-none"
                                name="quantity"
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5+">5+</option>
                            </select>
                        </div>

                        <button
                            onClick={() => handleAddToCart()}
                            className="absolute-center my-8 h-20 w-96 overflow-hidden rounded-xl border-2 border-black font-secondary text-3xl font-medium text-black hover:bg-black hover:text-white"
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>

                <div className="absolute-center mx-auto mt-24 h-full w-[90%] flex-col">
                    <div className="w-full font-secondary text-5xl font-bold">
                        Thông số kĩ thuật
                    </div>
                    <div>{product?.spec}</div>

                    <div className="w-full font-secondary text-5xl font-bold">
                        Mô tả sản phẩm
                    </div>
                    <div className="absolute-center full-size mt-6 font-primary text-3xl">
                        {product?.desc}
                    </div>
                </div>
                <div className="full-size mt-24">
                    <h2 className="absolute-center font-secondary text-5xl font-bold">
                        Sản phẩm tương tự
                    </h2>
                    <div className="mx-auto mt-8 h-[35rem] w-[90%]">
                        <div className="absolute-center h-fit w-full">
                            {/* <Swiper
                                modules={[
                                    Navigation,
                                    Pagination,
                                    Scrollbar,
                                    A11y,
                                ]}
                                spaceBetween={0}
                                slidesPerView="auto"
                                navigation
                                loop={true}
                                speed={1200}
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 3,
                                    },
                                    1280: {
                                        slidesPerView: 4,
                                    },
                                    1536: {
                                        slidesPerView: 5,
                                    },
                                }}
                            >
                                {FeaturedItem.map((item, index) => {
                                    return (
                                        <SwiperSlide
                                            key={index}
                                            virtualIndex={index}
                                        >
                                            <div className="absolute-center h-full w-full"></div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
    console.log(params);

    const { slug } = params;

    const product = await db.product.findUnique({
        where: {
            slug: slug,
        },
    });

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        },
    };
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return { paths: [], fallback: 'blocking' };
};

export default DetailsPage;
