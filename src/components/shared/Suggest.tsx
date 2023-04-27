import Link from 'next/link';
import { SuggestItems } from '~/constants';
import ProductCard from './ProductCard';
import { useEffect } from 'react';
import { api } from '~/utils/api';

const Suggest = () => {
    const utils = api.useContext();
    const getAllProductQuery = api.product.getAllProduct.useQuery({
        limit: 10,
    });

    return (
        <>
            <div className="absolute-center h-full min-h-screen w-full">
                <div className="mt-5 h-full w-[85%]">
                    <h2 className="absolute-center font-italic font-secondary text-6xl">
                        Gợi ý cho bạn
                    </h2>

                    <div className="my-8 mx-auto flex h-[80rem] w-full flex-wrap">
                        {getAllProductQuery.data?.items.map((item, index) => {
                            return <ProductCard key={index} product={item} />;
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
