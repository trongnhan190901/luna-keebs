import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
interface LoginProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ isOpen, setIsOpen }: LoginProps) => {
    return (
        <>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                as="div"
                className="absolute-center fixed top-1/2 left-1/2 z-50 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 flex-col rounded-3xl bg-white/80 font-primary text-xl font-semibold backdrop-blur-md"
            >
                <Dialog.Panel>
                    <Dialog.Title className="absolute-center my-4 text-5xl font-bold">
                        Đăng nhập
                    </Dialog.Title>
                    <Dialog.Description className="absolute-center my-4 text-2xl">
                        Để có trải nghiệm mua sắm trọn vẹn !!
                    </Dialog.Description>

                    <div className="flex flex-col space-y-6">
                        <button className="smooth-effect absolute-center mx-auto w-[200px] space-x-2 rounded-3xl border border-gray-700 py-4 px-6 hover:scale-110 hover:bg-sky-200 md:w-[250px]">
                            <Image
                                src="/fb_icon.svg"
                                alt="Facebook Icon"
                                width={30}
                                height={30}
                            />

                            <span className="text-base md:text-xl">
                                Đăng nhập với Facebook
                            </span>
                        </button>
                        <button className="smooth-effect absolute-center mx-auto w-[200px] space-x-2 rounded-3xl border border-gray-700 py-4 px-6 hover:scale-110 hover:bg-yellow-200 md:w-[250px]">
                            <Image
                                src="/gg_icon.svg"
                                alt="Facebook Icon"
                                width={30}
                                height={30}
                            />

                            <span className="text-base md:text-xl">
                                Đăng nhập với Google
                            </span>
                        </button>
                        <button
                            className="absolute-center smooth-effect my-6 text-2xl hover:scale-110 hover:text-rose-500"
                            onClick={() => setIsOpen(false)}
                        >
                            Bỏ qua
                        </button>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </>
    );
};

export default Login;
