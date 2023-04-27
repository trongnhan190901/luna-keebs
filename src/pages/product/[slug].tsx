/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @next/next/no-img-element */
import type { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import type { Product } from '@prisma/client';
import { db } from '~/libs/server/db';
import { useState } from 'react';
import ProductHeader from '~/components/shared/ProductHeader';

interface DetailsPageProps {
    product: Product;
}

const DetailsPage = ({ product }: DetailsPageProps) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <div className="full-size mt-20 mb-24 flex flex-col items-start justify-center">
                <ProductHeader product={product} />

                <div className="absolute-center mx-auto mt-24 h-full w-[90%] flex-col">
                    <div className="w-full font-secondary text-5xl font-bold">
                        Thông số kĩ thuật
                    </div>
                    <pre>{product?.spec}</pre>

                    <div className="w-full font-secondary text-5xl font-bold">
                        Mô tả sản phẩm
                    </div>
                    <pre className="absolute-center full-size mt-6 font-primary text-3xl">
                        {product?.desc}
                    </pre>
                </div>
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
    const { slug } = params;

    const product = await db.product.findUnique({
        where: {
            slug: slug,
        },
    });

    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        },
    };
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return { paths: [], fallback: 'blocking' };
};

// eslint-disable-next-line @typescript-eslint/require-await
// export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
//     return { paths: [], fallback: 'blocking' };
// };

export default DetailsPage;
