/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useAtom } from 'jotai';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { addProductState } from '~/atoms/modalAtom';
import ProductForm from '~/components/modal/ProductForm';
import ProductCard from '~/components/shared/ProductCard';
import { api } from '~/utils/api';

const AdminProduct = () => {
    const [newProductOpen, setNewProductOpen] = useAtom(addProductState);

    const products = api.product.getAllProduct.useQuery({});

    const [pageNumber, setPageNumber] = useState(0);
    const productPerPage = 12;
    const pagesVisited = pageNumber * productPerPage;

    const pageCount = Math.ceil(products?.data?.items.length / productPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <>
            <div className="full-size absolute-center my-16 flex-col">
                <div className="absolute-center my-16 mt-28 font-secondary text-7xl font-bold">
                    Thống kê sản phẩm
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
                <div className="flex w-4/5 flex-wrap">
                    {products.data?.items
                        .slice(pagesVisited, pagesVisited + productPerPage)
                        .map((item, index) => {
                            return <ProductCard product={item} key={index} />;
                        })}
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
        </>
    );
};

export default AdminProduct;
