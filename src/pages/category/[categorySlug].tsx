/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Product } from '@prisma/client';
import type { GetServerSideProps } from 'next';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import ProductCard from '~/components/shared/ProductCard';
import { db } from '~/libs/server/db';

interface CategoryProps {
    products: Product[];
    title: string;
}
const Category = ({ products, title }: CategoryProps) => {
    const [pageNumber, setPageNumber] = useState(0);
    const productPerPage = 10;
    const pagesVisited = pageNumber * productPerPage;

    const displayProducts = products
        .slice(pagesVisited, pagesVisited + productPerPage)
        .map((product) => <ProductCard product={product} key={product.id} />);

    const pageCount = Math.ceil(products.length / productPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    return (
        <>
            <div className="full-size absolute-center flex-col">
                <div className="mx-auto mt-12 w-[85%]">
                    <div className="absolute-center my-12 font-secondary text-7xl font-bold">
                        {title}
                    </div>
                    <div className="mx-auto flex flex-wrap">
                        {displayProducts}
                    </div>

                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={'pagination'}
                        previousLinkClassName={'previous_page'}
                        nextLinkClassName={'next_page'}
                        disabledClassName={'pagination_disabled'}
                        activeClassName={'pagination_active'}
                        pageLinkClassName={'page_link'}
                    />
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({
    params,
}: any) => {
    const { categorySlug } = params;

    const products = await db.product.findMany({
        where: {
            categoryName: categorySlug,
        },
    });

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            title: categorySlug,
        },
    };
};

export default Category;
