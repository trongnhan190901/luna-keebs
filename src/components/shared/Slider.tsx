/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { api } from '~/utils/api';
import SliderCard from './SliderCard';
import { Fragment } from 'react';

const Slider = () => {
    const getAllProductQuery = api.product.getAllProduct.useQuery({
        limit: 5,
        orderByTime: 'desc',
    });

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
                    initialSlide={1}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                    speed={1200}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {getAllProductQuery.data?.items.map((product, index) => (
                        <Fragment key={index}>
                            <SwiperSlide key={product.id}>
                                <SliderCard product={product} />
                            </SwiperSlide>
                        </Fragment>
                    ))}
                </Swiper>
            </div>
        </>
    );
};
export default Slider;
