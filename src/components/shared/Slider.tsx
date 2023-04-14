import { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { api } from '~/utils/api';
import { useEffect, Fragment } from 'react';
import SliderCard from './SliderCard';

const Slider = () => {
    const utils = api.useContext();
    const getAllProductQuery = api.product.getAllProduct.useInfiniteQuery(
        {
            limit: 5,
        },
        {
            getPreviousPageParam(lastPage) {
                return lastPage.nextCursor;
            },
        },
    );

    useEffect(() => {
        const productsArray =
            getAllProductQuery.data?.pages.flatMap((page) => page.items) ?? [];
        for (const { id } of productsArray) {
            void utils.product.getProduct.prefetch({ id });
        }
    }, [getAllProductQuery.data, utils]);

    return (
        <>
            <div className="z-0 h-full w-full">
                <Swiper
                    modules={[
                        Navigation,
                        Pagination,
                        Autoplay,
                        Scrollbar,
                        A11y,
                    ]}
                    navigation
                    allowTouchMove={false}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                    speed={1200}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {getAllProductQuery.data?.pages.map((page, index) => (
                        <Fragment key={page.items[0]?.id || index}>
                            {page.items.map((product) => (
                                <SwiperSlide key={product.id}>
                                    <SliderCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Fragment>
                    ))}
                </Swiper>
            </div>
        </>
    );
};
export default Slider;
