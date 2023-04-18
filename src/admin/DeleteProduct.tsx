'use client';

import { Fragment, useState } from 'react';
import { toast } from 'react-hot-toast';
import { api } from '~/utils/api';
import Button from '~/components/buttons/Button';
import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { deleteProductState } from '~/atoms/modalAtom';

interface DeleteProductProps {
    id: string;
    disabled?: boolean;
    deletePostAction?: () => void;
}
const DeleteProduct = ({ id, deletePostAction }: DeleteProductProps) => {
    const [open, setOpen] = useAtom(deleteProductState);

    const { mutate } = api.admin.deleteProduct.useMutation({
        retry: false,
        onSuccess: () => {
            toast.success('Product successfully deleted');
            deletePostAction?.();
        },
        onError: (err) => toast.error(err.message),
    });

    const handleSubmit = () => {
        mutate({ id });
    };

    return (
        <>
            <Button
                color="red"
                className="mr-1 p-3"
                localLoaderOnClick={false}
                type="button"
                onClick={() => setOpen(!open)}
            >
                Delete Product
            </Button>

            <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-100 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                as={Fragment}
            >
                <Dialog
                    open={open}
                    onClose={() => setOpen(!open)}
                    as="div"
                    className="fixed inset-0 z-10 flex overflow-y-auto"
                >
                    <Dialog.Overlay className="full-size z-0 bg-black opacity-40" />

                    <div className="absolute-center fixed top-1/2 left-1/2 z-20 h-[950px] w-[1600px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white/80 font-primary text-xl font-semibold backdrop-blur-md">
                        <Dialog.Panel className="full-size absolute-center flex-col">
                            <Dialog.Title className="absolute-center my-12 font-secondary text-5xl font-bold">
                                <h1 className="2xl mb-2 font-bold">Confirm</h1>
                                <div>
                                    Are you sure you want to delete this
                                    product?
                                </div>
                            </Dialog.Title>

                            <div className="flex flex-col">
                                <Button
                                    color="secondary"
                                    className="mr-1 p-3"
                                    localLoaderOnClick={false}
                                    type="button"
                                    onClick={() => setOpen(!open)}
                                >
                                    No, cancel
                                </Button>
                                <Button
                                    color="red"
                                    className="p-3"
                                    localLoaderOnClick={false}
                                    type="button"
                                    onClick={() => handleSubmit()}
                                >
                                    Yes, proceed
                                </Button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default DeleteProduct;
