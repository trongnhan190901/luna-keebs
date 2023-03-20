import { Dialog, Transition } from '@headlessui/react';
import { Product } from '@prisma/client';
import { inferProcedureInput } from '@trpc/server';
import { useAtom } from 'jotai';
import { Fragment, useEffect } from 'react';
import { editProductState, productEditState } from '~/atoms/modalAtom';
import type { AppRouter } from '~/server/routers/_app';
import { trpc } from '~/utils/trpc';

interface EditProductProps {
    product: Product;
}

const EditProduct = ({ product }: EditProductProps) => {
    const [editProductOpen, setEditProductOpen] = useAtom(editProductState);

    const [editProduct, setEditProduct] = useAtom(productEditState);

    const updateProduct = trpc.product.updateProduct.useMutation();

    // const deleteHandler = async () => {
    //     return await trpc.product.deleteProduct.useQuery({
    //         id: product.id,
    //     });
    // };

    console.log(product);

    const closeModal = () => {
        setEditProductOpen(false);
        setEditProduct({});
    };

    return (
        <>
            <Transition
                show={editProductOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                as={Fragment}
            >
                <Dialog
                    open={editProductOpen}
                    onClose={closeModal}
                    as="div"
                    className="fixed inset-0 z-10 flex overflow-y-auto"
                >
                    <Dialog.Overlay className="full-size z-0 bg-black opacity-40" />

                    <div className="absolute-center fixed top-1/2 left-1/2 z-20 h-[950px] w-[1600px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white/80 font-primary text-xl font-semibold backdrop-blur-md">
                        <Dialog.Panel className="full-size absolute-center flex-col">
                            <Dialog.Title className="absolute-center my-12 font-secondary text-5xl font-bold">
                                Thêm sản phẩm
                            </Dialog.Title>

                            <form
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    const $form = e.currentTarget;
                                    const values = Object.fromEntries(
                                        new FormData($form),
                                    );
                                    type Input = inferProcedureInput<
                                        AppRouter['product']['updateProduct']
                                    >;
                                    const input: Input = {
                                        id: values.id as string,
                                        title: values.title as string,
                                        type: values.type as string,
                                        price: values.price as string,
                                        image: values.image as string,
                                        quantity: values.quantity as string,
                                        spec: values.spec as string,
                                        desc: values.desc as string,
                                    };
                                    try {
                                        await updateProduct.mutateAsync(input);
                                        $form.reset();
                                    } catch (cause) {
                                        console.error(
                                            { cause },
                                            'Failed to edit product',
                                        );
                                    }
                                }}
                                className="flex flex-col"
                            >
                                <div className="flex">
                                    <div className="flex flex-col space-y-7">
                                        <div className="h-6 font-primary text-3xl font-bold ">
                                            Tên sản phẩm
                                        </div>
                                        <input
                                            name="title"
                                            type="text"
                                            className="h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                            placeholder="Họ và tên người nhân"
                                        />
                                        <div className="h-6 font-primary text-3xl font-bold ">
                                            Loại sản phẩm
                                        </div>
                                        <input
                                            name="type"
                                            type="text"
                                            className="h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                            placeholder="Số điện thoại người nhận"
                                        />
                                        <div className="h-6 font-primary text-3xl font-bold ">
                                            Hình ảnh
                                        </div>
                                        <input
                                            type="text"
                                            className="h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                            name="image"
                                        />
                                        <div className="h-6 font-primary text-3xl font-bold ">
                                            Giá
                                        </div>
                                        <input
                                            name="price"
                                            type="text"
                                            className="h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                            placeholder="Vui lòng chọn"
                                        />
                                        <div className="h-6 font-primary text-3xl font-bold ">
                                            Số lượng
                                        </div>
                                        <input
                                            name="quantity"
                                            type="number"
                                            className="h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                            placeholder="Vui lòng chọn"
                                        />
                                        <div className="h-6 font-primary text-3xl font-bold ">
                                            Thông số kĩ thuật
                                        </div>
                                        <textarea
                                            name="spec"
                                            className="h-96 w-[300px] rounded-3xl border border-black p-6 font-primary text-2xl"
                                            placeholder="Vui lòng chọn"
                                        />
                                    </div>

                                    <div className="mx-24 flex flex-col space-y-7">
                                        <div className="h-6 font-primary text-3xl font-bold ">
                                            Mô tả
                                        </div>
                                        <textarea
                                            name="desc"
                                            className="mb-12 h-[670px] w-[600px] rounded-3xl border border-black p-6 font-primary text-2xl"
                                            placeholder="Vui lòng chọn"
                                        />
                                    </div>
                                </div>

                                <div className="absolute-center flex-col pt-12">
                                    {updateProduct.error && (
                                        <p className="w-[500px] text-red-600">
                                            {updateProduct.error.message}
                                        </p>
                                    )}
                                    <div className="flex space-x-12">
                                        <button
                                            type="submit"
                                            className="smooth-effect absolute-center mx-auto w-[120px] space-x-2 rounded-3xl border-2 border-gray-700 py-4 px-6 hover:scale-110 hover:bg-teal-200"
                                        >
                                            <span className="font-secondary text-3xl font-bold">
                                                Chỉnh sửa
                                            </span>
                                        </button>
                                        <button
                                            // onClick={deleteHandler}
                                            className="smooth-effect absolute-center mx-auto w-[120px] space-x-2 rounded-3xl border-2 border-gray-700 py-4 px-6 hover:scale-110 hover:bg-red-300"
                                        >
                                            <span className="font-secondary text-3xl font-bold">
                                                Xóa
                                            </span>
                                        </button>
                                    </div>
                                    <button
                                        className="absolute-center smooth-effect my-6 font-secondary text-2xl  hover:scale-110 hover:text-rose-500"
                                        onClick={() =>
                                            setEditProductOpen(false)
                                        }
                                    >
                                        Quay lại
                                    </button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default EditProduct;
