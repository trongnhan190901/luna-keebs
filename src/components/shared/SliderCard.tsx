/* eslint-disable @next/next/no-img-element */
import ButtonRedirect from '../buttons/ButtonRedirect';

interface SliderCardProps {
    product: {
        image: string;
        title: string;
        slug: string;
    };
}

const SliderCard = ({ product }: SliderCardProps) => {
    return (
        <>
            <div className="absolute-center full-size">
                <div className="smooth-effect relative">
                    <img
                        alt=""
                        src={`https://${product.image}`}
                        className="z-0 h-[89vh] w-screen bg-contain object-cover brightness-75"
                    />
                    <div className="absolute left-1/2 -mt-[35rem] -translate-x-1/2 font-secondary font-semibold">
                        <div className="absolute-center flex-col">
                            <h2 className="h-[60px] w-full text-7xl leading-tight text-white">
                                {product.title}
                            </h2>

                            <div className="pt-16 md:pt-0">
                                <ButtonRedirect
                                    href={`/product/${product.slug}`}
                                    title={'Mua ngay'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SliderCard;
