import { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SlideShowItem } from '~/constants';
import ButtonRedirect from '../buttons/ButtonRedirect';

const Slider = () => {
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
                    slidesPerView="auto"
                    navigation
                    allowTouchMove={false}
                    autoplay={{ delay: 5000 }}
                    loop={true}
                    speed={1200}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                >
                    {SlideShowItem.map((item, index) => {
                        return (
                            <SwiperSlide key={index} virtualIndex={index}>
                                <div className="absolute-center full-size">
                                    <div className="smooth-effect relative">
                                        <img
                                            draggable="false"
                                            src={item.img}
                                            className="z-0 h-[89vh] w-screen bg-contain object-cover brightness-75"
                                        />
                                        <div className="absolute left-1/2 -mt-[35rem] -translate-x-1/2 font-secondary font-semibold">
                                            <div className="absolute-center flex-col">
                                                <h2 className="h-[60px] w-full text-7xl leading-tight text-white">
                                                    {item.title}
                                                </h2>
                                                <div className="pt-16 md:pt-0">
                                                    <ButtonRedirect
                                                        href={item.href}
                                                        title={'Mua ngay'}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </>
    );
};
export default Slider;
