/* eslint-disable indent */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { Fragment } from 'react';
import { addProductState } from '~/atoms/modalAtom';
import { useForm } from 'react-hook-form';
import type { FullProductClient } from '~/types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    type CreateProductsInput,
    createProductInputSchema,
} from '~/helpers/validations/productRoutesSchema';
import { api } from '~/utils/api';
import useUploadImage from '~/hooks/useUploadImage';
import { useState } from 'react';
import cn from '~/helpers/cn';
import Input from '~/components/shared/Input';
import Button from '~/components/buttons/Button';
import Image from 'next/image';
import DeleteProduct from './DeleteProduct';
import type { inferProcedureInput } from '@trpc/server';
import type { AppRouter } from '~/server/api/root';

interface AddNewProductProps {
    type: 'add' | 'edit';
    initialData?: FullProductClient;
    deletePostAction?: () => void;
}

const ProductForm = ({
    type,
    initialData,
    deletePostAction,
}: AddNewProductProps) => {
    const [isOpen, setIsOpen] = useAtom(addProductState);
    const [changeImage, setChangeImage] = useState(type === 'add');

    const utils = api.useContext();

    const { data: categoryList } = api.admin.getCategoryList.useQuery(
        undefined,
        {
            refetchOnWindowFocus: false,
            onError: (err) => console.error(err.message),
        },
    );

    const {
        id: imageId,
        mutate: submitImage,
        handleChange: saveImageLocal,
        file,
        setFile,
    } = useUploadImage(initialData?.id);

    //add new product

    //update product
    // const { mutate: updateProduct } = api.admin.updateProduct.useMutation({
    //     retry: false,
    //     onSuccess: () => {
    //         utils.product.get.invalidate();
    //         utils.admin.getProductsInfo.invalidate();
    //     },
    //     onError: (err) => console.error(err.message),
    // });

    const { setValue, getValues } = useForm<CreateProductsInput>({});

    //     handleSubmit(async (data) => {
    //         switch (type) {
    //             case 'add':
    //                 console.log(data);

    //                 return await saveNewProduct(data);

    //             case 'edit':
    //                 console.log(data);
    //                 return await updateProduct({
    //                     ...data,
    //                     id: initialData?.id || '',
    //                 });

    //             default:
    //                 console.log(data);
    //                 return;
    //         }
    //     })();
    // };
    const changeImageState = () => {
        if (changeImage) {
            setFile(null);
        }
        setChangeImage(!changeImage);
    };

    const addProduct = api.admin.createProduct.useMutation();
    return (
        <>
            <Transition
                show={isOpen}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                as={Fragment}
            >
                <Dialog
                    open={isOpen}
                    onClose={() => setIsOpen(!isOpen)}
                    as="div"
                    className="fixed inset-0 z-10 flex overflow-y-auto"
                >
                    <Dialog.Overlay className="full-size z-0 bg-black opacity-40" />

                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const $form = e.currentTarget;
                            const values = Object.fromEntries(
                                new FormData($form),
                            );
                            type Input = inferProcedureInput<
                                AppRouter['admin']['createProduct']
                            >;
                            let imageUrl;
                            if (changeImage && !!file) {
                                submitImage();
                                imageUrl =
                                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                                    process.env.NEXT_PUBLIC_S3_BUCKET_URL! +
                                    `/${imageId}`;
                                if (getValues('image') !== imageUrl) {
                                    setValue('image', imageUrl);
                                }
                            }

                            const input: Input = {
                                title: values.title as string,
                                categoryName: values.categoryName as string,
                                price: values.price as string,
                                image: imageUrl as string,
                                quantity: values.quantity as string,
                                spec: values.spec as string,
                                desc: values.desc as string,
                            };

                            switch (type) {
                                case 'add':
                                    try {
                                        await addProduct.mutateAsync(input);
                                        $form.reset();
                                    } catch (cause) {
                                        console.error(
                                            { cause },
                                            'Failed to add product',
                                        );
                                    }
                                    break;
                                case 'edit':
                                    try {
                                        // await addProduct.mutateAsync(input);
                                        // $form.reset();
                                    } catch (cause) {
                                        console.error(
                                            { cause },
                                            'Failed to edit product',
                                        );
                                    }
                                    break;
                                default:
                                    return;
                            }
                        }}
                        className="absolute-center fixed top-1/2 left-1/2 z-20 h-[900px] w-[1500px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white/80 font-primary text-xl font-semibold backdrop-blur-md"
                    >
                        <Dialog.Panel className="full-size absolute-center flex-col">
                            <Dialog.Title className="absolute-center mb-10 font-secondary text-6xl font-bold">
                                Thêm sản phẩm
                            </Dialog.Title>

                            <div className="flex flex-col">
                                <div className="flex">
                                    <div className="flex flex-col space-x-5 space-y-5">
                                        <Input
                                            name="title"
                                            title="Tên sản phẩm"
                                            placeholder="Nhập tên sản phẩm"
                                            required
                                        />
                                        <div className="flex">
                                            <div
                                                className="ml-4 h-6 
                                             px-3 font-primary text-3xl font-bold "
                                            >
                                                Loại sản phẩm
                                            </div>
                                            <p className="ml-1 text-red-400">
                                                *
                                            </p>
                                        </div>

                                        <div className="flex flex-row">
                                            <select
                                                className="mr-6 h-[40px] w-[180px] rounded-3xl border border-black pl-3 font-primary text-2xl font-bold"
                                                name="categoryName"
                                                id=""
                                            >
                                                {categoryList?.map(
                                                    ({ id, name }) => (
                                                        <option
                                                            onClick={() =>
                                                                (() => {
                                                                    setValue(
                                                                        'categoryName',
                                                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                                                                        name,
                                                                    );
                                                                })()
                                                            }
                                                            key={id}
                                                            className={cn(
                                                                'cursor-pointer border border-zinc-300 p-2 duration-75 ease-in hover:border-zinc-800 hover:text-zinc-800',
                                                            )}
                                                        >
                                                            {name}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        </div>
                                        <div className="flex w-full space-x-7">
                                            <div className="w-full">
                                                <Input
                                                    title="Giá"
                                                    placeholder="Nhập giá"
                                                    required
                                                    className="w-80"
                                                    name="price"
                                                    // type="number"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <Input
                                                    title="Số lượng"
                                                    placeholder="Nhập số lượng"
                                                    required
                                                    className="w-56"
                                                    // type="number"
                                                    name="quantity"
                                                />
                                            </div>
                                        </div>

                                        {initialData?.image && (
                                            <div className="flex flex-row justify-end">
                                                <Button
                                                    color="secondary"
                                                    className="p-3"
                                                    localLoaderOnClick={false}
                                                    type="button"
                                                    onClick={() =>
                                                        changeImageState()
                                                    }
                                                >
                                                    {changeImage
                                                        ? 'Cancel Change'
                                                        : 'Change Image'}
                                                </Button>
                                            </div>
                                        )}

                                        {changeImage && (
                                            <div>
                                                <Input
                                                    type="file"
                                                    name="image"
                                                    title="Hình ảnh"
                                                    accept="image/*"
                                                    required
                                                    className="border-[0px]"
                                                    onChange={(e) => {
                                                        saveImageLocal(
                                                            e as React.ChangeEvent<HTMLInputElement>,
                                                        );
                                                    }}
                                                />
                                            </div>
                                        )}
                                        {!file && getValues('image') && (
                                            <div className="mx-auto max-w-[400px]">
                                                <Image
                                                    src={getValues('image')}
                                                    width={100}
                                                    height={50}
                                                    alt="image"
                                                    className="h-auto w-auto"
                                                />
                                                {getValues('image')}
                                            </div>
                                        )}
                                        {file && (
                                            <div className="mx-auto max-w-[400px]">
                                                <Image
                                                    src={URL.createObjectURL(
                                                        file,
                                                    )}
                                                    alt="image"
                                                    width={50}
                                                    height={100}
                                                    className="h-auto w-auto"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="mx-24 flex flex-col space-y-4">
                                        <Input
                                            title="Thông số kĩ thuật"
                                            placeholder="Nhập thông số kĩ thuật"
                                            required
                                            textArea
                                            name="spec"
                                            className="h-[200px] w-[550px]"
                                        />
                                        <Input
                                            title="Mô tả sản phẩm"
                                            placeholder="Nhập mô tả sản phẩm"
                                            required
                                            textArea
                                            name="desc"
                                            className="h-[330px] w-[550px]"
                                        />
                                    </div>
                                </div>

                                <div className="absolute-center flex-col pt-12">
                                    {type === 'edit' && initialData && (
                                        <DeleteProduct
                                            id={initialData.id}
                                            deletePostAction={deletePostAction}
                                        />
                                    )}
                                    <Button
                                        color="primary"
                                        className="p-3"
                                        type="submit"
                                    >
                                        {type === 'add'
                                            ? 'Thêm sản phẩm'
                                            : 'Cập nhật sản phẩm'}
                                    </Button>

                                    <button
                                        className="absolute-center smooth-effect my-6 font-secondary text-2xl  hover:scale-110 hover:text-rose-500"
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        Quay lại
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </form>
                </Dialog>
            </Transition>
        </>
    );
};

export default ProductForm;
