import { Dialog, Transition } from '@headlessui/react';
import { signOut, useSession } from 'next-auth/react';
import {
    ArrowLeftOnRectangleIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { userMenuState } from '~/atoms/modalAtom';
import { Fragment } from 'react';
import { useAtom } from 'jotai';

const UserMenu = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [isOpen, setIsOpen] = useAtom(userMenuState);

    const DirectAccountPage = () => {
        router.push('/account');
        setIsOpen(false);
    };

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
                    <div className="absolute-center fixed top-1/2 left-1/2 z-20 h-[350px] w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white/80 font-primary text-xl font-semibold backdrop-blur-md">
                        <Dialog.Panel className="full-size absolute-center flex-col">
                            <Dialog.Title className="absolute-center my-4 text-5xl font-bold">
                                {session?.user?.name}
                            </Dialog.Title>
                            <Dialog.Description className="absolute-center my-4 text-2xl">
                                {session?.user?.email}
                            </Dialog.Description>

                            <div className="flex flex-col space-y-6">
                                <button
                                    onClick={() => DirectAccountPage()}
                                    className="smooth-effect absolute-center mx-auto w-[250px] space-x-2 rounded-3xl border border-gray-700 py-4 px-6 hover:scale-110 hover:bg-teal-200"
                                >
                                    <UserIcon className="h-10 w-10" />
                                    <span className="text-base md:text-xl">
                                        Thông tin người dùng
                                    </span>
                                </button>
                                <button
                                    onClick={() => signOut()}
                                    className="smooth-effect absolute-center mx-auto w-[250px] space-x-2 rounded-3xl border border-gray-700 py-4 px-6 hover:scale-110 hover:bg-teal-200"
                                >
                                    <ArrowLeftOnRectangleIcon className="h-10 w-10" />
                                    <span className="text-base md:text-xl">
                                        Đăng xuất
                                    </span>
                                </button>
                                <button
                                    className="absolute-center smooth-effect my-6 font-secondary text-2xl  hover:scale-110 hover:text-rose-500"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Quay lại
                                </button>
                            </div>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default UserMenu;
