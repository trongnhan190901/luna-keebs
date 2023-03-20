import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { Fragment } from 'react';
import { shoppingCartState } from '~/atoms/modalAtom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useShoppingCart from '~/context/ShoppingCartContext';
import CartItem from './CartItem';

const ShoppingCart = () => {
    const [isOpen, setIsOpen] = useAtom(shoppingCartState);

    const { cartItems } = useShoppingCart();

    const totalPrice = () => {
        const total = 0;
    };

    return (
        <>
            <Transition show={isOpen} appear={true}>
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-out duration-300"
                    enterFrom="transform opacity-0"
                    enterTo="transform opacity-100"
                    leave="transition ease-in duration-70"
                    leaveFrom="transform opacity-100"
                    leaveTo="transform opacity-0"
                >
                    <Dialog
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        as="div"
                        className="fixed inset-0 z-10 flex justify-end"
                    >
                        <Dialog.Overlay className="full-size z-0 bg-black bg-opacity-40" />
                        <div className="fixed z-20 h-full w-[500px] flex-col bg-white font-primary text-xl font-semibold backdrop-blur-md">
                            <Dialog.Panel className="full-size flex flex-col items-center border-b">
                                <div className="flex h-[120px] w-full flex-row items-center border-b">
                                    <Dialog.Title className="mx-12 flex w-full text-5xl font-bold">
                                        Giỏ hàng
                                    </Dialog.Title>
                                    <div
                                        className="flex w-full justify-end"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <div className="absolute-center smooth-effect group mx-12 h-12 w-12 rounded-full bg-gray-200 hover:scale-105 hover:border hover:border-black hover:stroke-black">
                                            <XMarkIcon className="h-10 w-10 stroke-gray-400 group-hover:scale-105 group-hover:stroke-black" />
                                        </div>
                                    </div>
                                </div>

                                {cartItems.map((item) => {
                                    return (
                                        <CartItem
                                            key={item.id}
                                            product={item}
                                        />
                                    );
                                })}

                                <div className="absolute bottom-0 h-[300px] w-full border-t bg-gray-100">
                                    <div className="absolute-center mx-2 h-36 w-full flex-col">
                                        <div className="absolute-center flex-row">
                                            <input
                                                type="text"
                                                placeholder="Mã giảm giá"
                                                className="h-20 w-[300px] rounded-lg border-2 px-6 font-secondary text-2xl font-bold  focus:outline-none"
                                            />
                                            <button
                                                onClick={totalPrice}
                                                className="mx-2 h-20 w-[90px] rounded-lg bg-gray-600 font-secondary
                                     text-2xl font-bold text-white hover:scale-105 hover:bg-black"
                                            >
                                                Sử dụng
                                            </button>
                                        </div>

                                        {/* <div className="mt-3 flex w-full flex-col px-28">
                                        <span className="font-primary text-xl text-red-600">
                                            * Mã không đúng
                                        </span>
                                        <span className="font-primary text-xl text-green-600">
                                            * Dùng mã thành công
                                        </span>
                                    </div> */}
                                    </div>
                                    <div className="mb-8 mt-12 flex">
                                        <div className="ml-20 flex w-full font-primary text-3xl font-bold">
                                            Tạm tính
                                        </div>
                                        <div className="mr-20 flex w-full justify-end font-primary text-3xl font-bold">
                                            ₫
                                        </div>
                                    </div>

                                    <div className="absolute-center flex-col">
                                        <div className="font-secondary text-2xl uppercase text-gray-600">
                                            Phí vận chuyển được tính khi thanh
                                            toán
                                        </div>
                                        <button className="absolute-center smooth-effect mt-4 h-[5.5rem] w-[300px] rounded-lg bg-gray-600 font-secondary text-2xl font-bold text-white hover:scale-105 hover:bg-black">
                                            Thanh toán
                                        </button>
                                    </div>

                                    <div
                                        onClick={() => setIsOpen(false)}
                                        className="absolute-center smooth-effect mt-4 w-full text-2xl text-gray-500 hover:text-black"
                                    >
                                        Tiếp tục mua sắm
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                </Transition.Child>
            </Transition>
        </>
    );
};

export default ShoppingCart;
