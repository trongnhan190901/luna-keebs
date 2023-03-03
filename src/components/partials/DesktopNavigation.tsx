import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo } from 'react';

const DesktopNavigation = () => {
    return (
        <>
            <div className="full-size smooth-effect z-10 flex items-center justify-end font-secondary text-3xl font-bold text-white">
                <ul>
                    <li className="group relative mx-6 cursor-pointer tracking-wide hover:underline hover:underline-offset-8">
                        <Link href="/">Shop</Link>
                        <div className="absolute -ml-6 hidden h-auto py-6 group-hover:flex">
                            <ul className="top-0 w-72 bg-[#fcf8ee] py-4 px-6 shadow">
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Sản phẩm mới
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Restock
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Case
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        PCB
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Plate
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Plate
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Phím đã sử dụng
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <ul>
                    <li className="group relative mx-6 cursor-pointer tracking-wide hover:underline hover:underline-offset-8">
                        <Link href="/">Keyboard Kit</Link>
                        <div className="absolute -ml-6 hidden h-auto py-6 group-hover:flex">
                            <ul className="top-0 w-56 bg-[#fcf8ee] py-4 px-6 shadow">
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Layout 100%
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Layout 80%
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Layout 75%
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Layout 65%
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Layout 60%
                                    </a>
                                </li>

                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Layout 40%
                                    </a>
                                </li>
                                <li className="py-2">
                                    <a className="flex cursor-pointer font-bold text-gray-500 hover:text-black">
                                        Layout 20%
                                    </a>
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
