/* eslint-disable @typescript-eslint/no-floating-promises */
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';
import { api } from '~/utils/api';

const DesktopNavigation = () => {
    const router = useRouter();

    const handleClick = (pathname: string) => {
        router.push({
            pathname: `/category/${pathname}`,
        });
    };

    return (
        <>
            <div className="full-size smooth-effect z-10 flex items-center justify-end font-secondary text-3xl font-bold text-white">
                <ul>
                    <li className="group relative mx-6 cursor-pointer tracking-wide hover:underline hover:underline-offset-8">
                        <div>Keyboard Kit</div>
                        <div className="absolute -ml-6 hidden h-auto py-6 group-hover:flex">
                            <ul className="top-0 w-56 bg-[#fcf8ee] py-4 px-6 shadow">
                                <li className="py-2">
                                    <button
                                        onClick={() =>
                                            handleClick('Keyboard Kit 100%25')
                                        }
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Layout 100%
                                    </button>
                                </li>
                                <li className="py-2">
                                    <button
                                        onClick={() =>
                                            handleClick('Keyboard Kit 80%25')
                                        }
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Layout 80%
                                    </button>
                                </li>
                                <li className="py-2">
                                    <button
                                        onClick={() =>
                                            handleClick('Keyboard Kit 75%25')
                                        }
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Layout 75%
                                    </button>
                                </li>
                                <li className="py-2">
                                    <button
                                        onClick={() =>
                                            handleClick('Keyboard Kit 65%25')
                                        }
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Layout 65%
                                    </button>
                                </li>
                                <li className="py-2">
                                    <button
                                        onClick={() =>
                                            handleClick('Keyboard Kit 60%25')
                                        }
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Layout 60%
                                    </button>
                                </li>

                                <li className="py-2">
                                    <button
                                        onClick={() =>
                                            handleClick('Keyboard Kit 40%25')
                                        }
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Layout 40%
                                    </button>
                                </li>
                                <li className="py-2">
                                    <button
                                        onClick={() =>
                                            handleClick('Keyboard Kit 20%25')
                                        }
                                        className="flex cursor-pointer font-bold text-gray-500 hover:text-black"
                                    >
                                        Layout 20%
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <ul>
                    <li className="group relative mx-6 cursor-pointer tracking-wide hover:underline hover:underline-offset-8">
                        <Link href="/">Phụ kiện</Link>
                        <div className="absolute -ml-6 hidden h-auto py-6 group-hover:flex">
                            <ul className="top-0 w-52 bg-[#fcf8ee] py-4 px-6 shadow">
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Switches
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Keycaps
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Stabilizers
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Cables
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Deskmats
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Kê tay
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Bags
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Modding
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <ul>
                    <li className="group relative mx-6 cursor-pointer tracking-wide hover:underline hover:underline-offset-8">
                        <Link href="/">Group Buy</Link>
                        <div className="absolute -ml-6 hidden h-auto py-6 group-hover:flex">
                            <ul className="top-0 w-48 bg-[#fcf8ee] py-4 px-6 shadow">
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Live
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Update
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
                <ul>
                    <li className="group relative mx-6 cursor-pointer tracking-wide hover:underline hover:underline-offset-8">
                        <Link href="/">Khác</Link>
                        <div className="absolute -ml-6 hidden h-auto py-6 group-hover:flex">
                            <ul className="top-0 w-56 bg-[#fcf8ee] py-4 px-6 shadow">
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Hướng dẫn
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Giao hàng
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Bảo hành
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Thu cũ
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Sữa chữa
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Liên hệ
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default memo(DesktopNavigation);
