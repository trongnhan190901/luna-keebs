import { SuggestItems } from '~/constants';
import ProductCard from './ProductCard';

const ProductList = () => {
    return (
        <>
            <div className="full-size absolute-center flex flex-col">
                <img
                    src="/images/lily60.jpg"
                    alt=""
                    className="h-[400px] w-full object-cover"
                />
                <h2 className="my-12 font-secondary text-7xl font-bold">
                    Sản phẩm mới
                </h2>
                <div className="h-24 w-full bg-rose-100"></div>
                <div className="my-8 font-primary text-2xl font-bold text-gray-600">
                    30 sản phẩm
                </div>
                <div className="h-[80rem] w-full">
                    {SuggestItems.map((item, index) => {
                        return (
                            <div className="absolute-center" key={index}>
                                {item.map((value) => {
                                    return (
                                        <div key={value.id} className="mx-5">
                                            <ProductCard product={value} />
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                <div className="h-[80rem] w-full">
                    {SuggestItems.map((item, index) => {
                        return (
                            <div className="absolute-center" key={index}>
                                {item.map((value) => {
                                    return (
                                        <div key={value.id} className="mx-5">
                                            <ProductCard product={value} />
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                <div className="h-[80rem] w-full">
                    {SuggestItems.map((item, index) => {
                        return (
                            <div className="absolute-center" key={index}>
                                {item.map((value) => {
                                    return (
                                        <div key={value.id} className="mx-5">
                                            <ProductCard product={value} />
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ProductList;
