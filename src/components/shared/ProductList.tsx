import { PrismaClient, Product } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
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
                    {products.map((product) => {
                        return (
                            <div className="absolute-center" key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const prisma = new PrismaClient();
    const products = await prisma.product.findMany();

    return {
        props: {
            products,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return { paths: [], fallback: true };
};

export default ProductList;
