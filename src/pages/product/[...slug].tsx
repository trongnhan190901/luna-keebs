import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '~/components/shared/ProductCard';
import { FeaturedItem } from '~/constants';
import { ProductPreview } from '~/types';
import ProductQuantity from '~/features/ProductQuantity';
import useShoppingCart from '~/context/ShoppingCartContext';

interface DetailsPageProps {
    product: ProductPreview[];
}

const DetailsPage: NextPage<DetailsPageProps> = ({
    product,
}: DetailsPageProps) => {
    const { getItemQuantity } = useShoppingCart();

    return (
        <>
            <div className="full-size mt-20 mb-24 flex flex-col items-start justify-center">
                <div className=" flex h-full w-[90%] flex-row items-start justify-center">
                    <div className="mx-24 h-full w-[1000px]">
                        <img
                            src={product.img}
                            alt=""
                            className="h-[650px] w-[1000px] rounded-3xl object-cover"
                        />
                    </div>
                    <div className="mx-4 h-full">
                        <h1
                            className="mt-8 font-secondary text-7xl
                         font-bold"
                        >
                            {product.title}
                        </h1>
                        <div className="ml-12 mt-12 mb-20 font-primary text-4xl font-bold text-teal-500">
                            ₫ {product.price}
                        </div>

                        <div className="mb-2 font-secondary text-3xl font-medium text-gray-900">
                            Số lượng
                        </div>
                        <div className="my-4 flex w-full items-center justify-start">
                            <ProductQuantity product={product} />
                        </div>

                        <button
                            onClick={() => getItemQuantity(product.id)}
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
                    {/* <div>{product.spec}</div> */}

                    <div className="w-full font-secondary text-5xl font-bold">
                        Mô tả sản phẩm
                    </div>
                    <div className="absolute-center full-size mt-6 font-primary text-3xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Illo, corporis rem non, dolorem laborum qui doloribus
                        nemo nam aspernatur iusto ipsam culpa maxime quis
                        cupiditate, dolores sed perferendis impedit voluptas?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsam quos officiis ducimus eum beatae, delectus fuga
                        autem iste qui doloremque blanditiis repellat optio
                        doloribus totam unde necessitatibus id sed aliquid?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sit molestiae, optio dignissimos repellendus consectetur
                        ullam in. Voluptatibus voluptates temporibus fuga porro
                        voluptate praesentium, pariatur ratione odio, itaque
                        quia veritatis doloremque!
                    </div>
                </div>
                <div className="full-size mt-24">
                    <h2 className="absolute-center font-secondary text-5xl font-bold">
                        Sản phẩm tương tự
                    </h2>
                    <div className="mx-auto mt-8 h-[35rem] w-[90%]">
                        <div className="absolute-center h-fit w-full">
                            <Swiper
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
                                            <div className="absolute-center h-full w-full">
                                                <ProductCard product={item} />
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const data = FeaturedItem;

    return {
        props: {
            product: data[1],
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: [], fallback: true };
};

export default DetailsPage;
