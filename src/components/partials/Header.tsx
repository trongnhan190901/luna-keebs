import Logo from '~/components/icons/Logo';
import Link from 'next/link';
import DesktopNavigation from '~/components/partials/DesktopNavigation';
import Login from '~/components/partials/Login';
import SearchBar from '~/components/partials/SearchBar';
import { ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { memo, useState } from 'react';
import MobileNavigation from './MobileNavigation';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <header className="absolute-center absolute z-10 h-48 w-full bg-transparent font-primary md:h-[12rem]">
                <div className="absolute-center w-full flex-col lg:flex ">
                    <div className="absolute-center flex h-44 w-[90%] lg:w-[80%]">
                        <div className="flex h-full w-full items-center lg:hidden">
                            <MobileNavigation />
                        </div>
                        {/* Logo */}
                        <Link href="/">
                            <div className="absolute-center mx-auto flex h-52 w-full justify-center px-6 md:mt-2 lg:mx-0">
                                <Logo style="h-52 w-52 cursor-pointer" />
                            </div>
                        </Link>

                        <div className="flex w-full justify-end font-secondary text-3xl font-medium">
                            <div className="hidden w-full lg:flex">
                                <DesktopNavigation />
                            </div>
                            <div className="md:absolute-center  smooth-effect mr-6 hidden cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 lg:mx-6">
                                <SearchBar />
                            </div>

                            {/* Carts */}
                            <Link href="/cart">
                                <div className="md:absolute-center smooth-effect mr-6 hidden cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 lg:mx-6">
                                    <ShoppingBagIcon className="h-14 w-14 stroke-white" />
                                </div>
                            </Link>

                            <div className="md:absolute-center smooth-effect mr-6 hidden cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 lg:mx-6">
                                <UserCircleIcon
                                    className="h-[3.75rem] w-[3.75rem] stroke-white"
                                    onClick={() => setIsOpen(!isOpen)}
                                />
                                <Login isOpen={isOpen} setIsOpen={setIsOpen} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default memo(Header);
