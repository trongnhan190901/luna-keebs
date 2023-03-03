import Link from 'next/link';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from '~/components/shared/ProductCard';
import { FeaturedItem } from '~/constants';

const NewArrival = () => {
    return (
        <>
            <div className="absolute-center h-full w-full">
                <div className="my-20 h-full w-[95%] lg:w-[90%]">
                    <h2 className="absolute-center font-italic font-secondary text-6xl">
                        Nổi bật
                    </h2>
                    <div className="absolute-center mb-4 h-[40px] w-full">
                        <Link href="#">
                            <span className="font-secondary text-2xl text-gray-500 underline underline-offset-4 hover:text-black">
                                Mua ngay
                            </span>
                        </Link>
                    </div>

                    <div className="mx-auto h-[35rem] w-full">
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
export default NewArrival;
