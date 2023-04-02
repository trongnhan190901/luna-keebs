/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable indent */

import type { NextPage } from 'next';
import ProductForm from '~/admin/ProductForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { ITEMS_PER_PAGE } from '~/constants';
import usePaginatedRef from '~/hooks/usePaginatedRef';
import ProductCard from '~/components/shared/ProductCard';
import { Fragment } from 'react';
import { addProductState } from '~/atoms/modalAtom';
import { useAtom } from 'jotai';
import Loader from '~/components/shared/Loader';
// import AdminNavbar from '~/admin/Navbar';

enum Sort {
    Desc = 'Desc',
    Asc = 'Asc',
    PriceUp = 'PriceUp',
    PriceDown = 'PriceDown',
}

const Admin: NextPage = () => {
    const [newProductOpen, setNewProductOpen] = useAtom(addProductState);
    // const { data: session, status } = useSession();
    // const router = useRouter();

    // const user = session?.user;
    // if ((user && user.role !== 'Admin') || status == 'unauthenticated') {
    //     void router.push('/');
    //     return null;
    // }

    // const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    //     api.admin.getProductsInfo.useInfiniteQuery(
    //         {
    //             take: ITEMS_PER_PAGE,
    //             sort: Sort.PriceDown,
    //         },
    //         {
    //             refetchOnWindowFocus: false,
    //             getNextPageParam: (lastPage) => lastPage.cursor,
    //         },
    //     );

    // const { viewRef } = usePaginatedRef({
    //     hasNextPage,
    //     fetchNextPage,
    // });

    // const pages = data?.pages;
    // if (isLoading) {
    //     return <Loader />;
    // }

    return (
        <>
            <div className="full-size flex">
                <div className="flex ">{/* <AdminNavbar /> */}</div>
                <div className="full-size absolute-center flex-col">
                    <div className="absolute-center my-4 mt-28 font-secondary text-7xl font-bold">
                        Trang quản trị
                    </div>
                    <div className="absolute-center flex-col">
                        <div className="absolute-center flex h-full w-[90%]">
                            <div className="absolute-center mt-12 mb-20 flex w-full flex-col">
                                {/* {pages?.map((page) => (
                                    <Fragment key={page.cursor ?? 'last'}>
                                        {page.products.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                {...product}
                                            />
                                        ))}
                                    </Fragment>
                                ))} */}
                            </div>
                        </div>
                        <button
                            onClick={() => setNewProductOpen(!newProductOpen)}
                            className="absolute-center h-20 w-64 rounded-3xl border-2 border-black hover:bg-black hover:text-white"
                        >
                            <span className="absolute-center mx-2 font-secondary text-3xl font-bold">
                                Thêm sản phẩm
                            </span>
                            <ProductForm type="add" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
