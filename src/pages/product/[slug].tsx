/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @next/next/no-img-element */
import type { GetStaticPaths, GetStaticProps } from 'next';
import type { Product } from '@prisma/client';
import { db } from '~/libs/server/db';
import { useState } from 'react';
import ProductHeader from '~/components/shared/ProductHeader';

interface DetailsPageProps {
    product: Product;
}

const DetailsPage = ({ product }: DetailsPageProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <div className="full-size mt-20 mb-24 flex flex-col items-start justify-center">
                <ProductHeader product={product} />

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
