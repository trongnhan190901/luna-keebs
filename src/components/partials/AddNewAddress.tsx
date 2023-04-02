import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { Fragment } from 'react';
import { newAddressState } from '~/atoms/modalAtom';

const AddNewAddress = () => {
    const [isOpen, setIsOpen] = useAtom(newAddressState);

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
                    onClose={() => setIsOpen(false)}
                    as="div"
                    className="fixed inset-0 z-10 flex overflow-y-auto"
                >
                    <Dialog.Overlay className="full-size z-0 bg-black opacity-40" />
                    <div className="absolute-center fixed top-1/2 left-1/2 z-20 h-[800px] w-[600px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white/80 font-primary text-xl font-semibold backdrop-blur-md">
                        <Dialog.Panel className="full-size absolute-center flex-col">
                            <Dialog.Title className="absolute-center my-12 font-secondary text-5xl font-bold">
                                Thêm địa chỉ mới
                            </Dialog.Title>

                            <div className="full-size flex flex-col space-y-7">
                                <div className="h-6 font-primary text-3xl font-bold ">
                                    Họ và tên
                                </div>
                                <input
                                    type="text"
                                    className="h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                    placeholder="Họ và tên người nhân"
                                />
                                <div className="h-6 font-primary text-3xl font-bold ">
                                    Số điện thoại
                                </div>
                                <input
                                    type="text"
                                    className="h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                    placeholder="Số điện thoại người nhận"
                                />
                                <div className="h-6 font-primary text-3xl font-bold ">
                                    Địa chỉ
                                </div>
                                <input
                                    type="text"
                                    className="h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                    placeholder="Số nhà, tên đường"
                                />
                                <div className="h-6 font-primary text-3xl font-bold ">
                                    Tỉnh/Thành phố
                                </div>
                                <input
                                    type="select"
                                    className="h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                    placeholder="Vui lòng chọn"
                                />
                                <div className="h-6 font-primary text-3xl font-bold ">
                                    Quận/Huyện
                                </div>
                                <input
                                    type="select"
                                    className="h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                    placeholder="Vui lòng chọn"
                                />
                                <div className="h-6 font-primary text-3xl font-bold ">
                                    Phường/Xã
                                </div>
                                <input
                                    type="select"
                                    className="mb-12 h-16 w-[300px] rounded-3xl border border-black px-6 font-primary text-2xl"
                                    placeholder="Vui lòng chọn"
                                />
                                <div className="absolute-center flex-col pt-3">
                                    <button className="smooth-effect absolute-center mx-auto w-[120px] space-x-2 rounded-3xl border-2 border-gray-700 py-4 px-6 hover:scale-110 hover:bg-teal-200">
                                        <span className="font-secondary text-3xl font-bold">
                                            Thêm
                                        </span>
                                    </button>

                                    <button
                                        className="absolute-center smooth-effect my-6 font-secondary text-2xl  hover:scale-110 hover:text-rose-500"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Quay lại
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default AddNewAddress;
