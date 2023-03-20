import Link from 'next/link';
import { SuggestItems } from '~/constants';
import ProductCard from './ProductCard';
const Suggest = () => {
    return (
        <>
            <div className="absolute-center h-full min-h-screen w-full">
                <div className="mt-5 h-full w-[90%]">
                    <h2 className="absolute-center font-italic font-secondary text-6xl">
                        Gợi ý cho bạn
                    </h2>
                    <div className="absolute-center mb-4 h-[40px] w-full">
                        <Link href="#">
                            <span className="font-secondary text-2xl text-gray-500 underline underline-offset-4 hover:text-black">
                                Mua ngay
                            </span>
                        </Link>
                    </div>
                    <div className="my-8 h-[80rem] w-full">
                        {SuggestItems.map((item, index) => {
                            return (
                                <div className="absolute-center" key={index}>
                                    {item.map((value) => {
                                        return (
                                            <div
                                                key={value.id}
                                                className="mx-5"
                                            >
                                                <ProductCard product={value} />
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>

                    <div className="mb-5 flex h-full w-full">
                        <iframe
                            width="1800"
                            height="900"
                            className="rounded-2xl"
                            src="https://www.youtube.com/embed/qoTpQogP2QE?rel=0"
                            title="ai03 Vega w/ Epsilons | Typing Sound Test"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Suggest;
