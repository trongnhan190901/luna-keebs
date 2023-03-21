/* eslint-disable indent */
import { useAtom } from 'jotai';
import type { NextPage } from 'next';
import { Fragment, useEffect } from 'react';
import { addProductState } from '~/atoms/modalAtom';
import AddNewProduct from '~/admin/AddNewProduct';
import { api } from '~/utils/api';
import AdminProductItem from '~/admin/AdminProductItem';

const Admin: NextPage = () => {
    // const [newProductOpen, setNewProductOpen] = useAtom(addProductState);
    // const utils = api.useContext();
    // const getAllProductQuery = api.product.getAllProduct.useInfiniteQuery(
    //     {},
    //     {
    //         getPreviousPageParam(lastPage) {
    //             return lastPage.nextCursor;
    //         },
    //     },
    // );
    // useEffect(() => {
    //     const allProducts =
    //         getAllProductQuery.data?.pages.flatMap((page) => page.items) ?? [];
    //     for (const { id } of allProducts) {
    //         void utils.product.getProduct.prefetch({ id });
    //     }
    //     console.log(12);
    // }, [getAllProductQuery.data, utils]);
    // return (
    //     <>
    //         <div className="absolute-center my-4 mt-28 font-secondary text-7xl font-bold">
    //             Trang quản trị
    //         </div>
    //         <div className="absolute-center flex-col">
    //             <div className="absolute-center flex h-full w-[90%]">
    //                 <div className="absolute-center mt-12 mb-20 flex w-full flex-col">
    //                     {getAllProductQuery.data?.pages.map((page, index) => (
    //                         <Fragment key={page.items[0]?.id || index}>
    //                             {page.items.map((item) => {
    //                                 return (
    //                                     <div
    //                                         className="w-full"
    //                                         key={item.id}
    //                                         // onClick={() => setEditProduct(item)}
    //                                     >
    //                                         <AdminProductItem product={item} />
    //                                     </div>
    //                                 );
    //                             })}
    //                         </Fragment>
    //                     ))}
    //                 </div>
    //             </div>
    //             <button
    //                 onClick={() => setNewProductOpen(!newProductOpen)}
    //                 className="absolute-center h-20 w-64 rounded-3xl border-2 border-black hover:bg-black hover:text-white"
    //             >
    //                 <span className="absolute-center mx-2 font-secondary text-3xl font-bold">
    //                     Thêm sản phẩm
    //                 </span>
    //                 <AddNewProduct />
    //             </button>
    //             {/* <EditProduct product={product} /> */}
    //         </div>
    //     </>
    // );
};

export default Admin;
