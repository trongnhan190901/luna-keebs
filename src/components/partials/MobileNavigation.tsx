import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Disclosure } from '@headlessui/react';

const MobileNavigation = () => {
    return (
        <>
            <Disclosure as="nav">
                <Disclosure.Button className="group peer focus:outline-none">
                    <Bars3Icon
                        className="absolute-center smooth-effect h-14 w-14 stroke-white transition ease-in-out hover:-translate-y-1 hover:scale-110"
                        aria-hidden="true"
                    />
                </Disclosure.Button>
                <div className="peer:transition fixed top-0 -left-96 z-20 h-screen w-80 bg-white p-6 delay-150  duration-200 ease-out peer-focus:left-0">
                    <div className="item-center flex flex-col justify-start">
                        <h1 className="w-full cursor-pointer border-b border-gray-100 pb-4 text-center text-base font-bold text-blue-900">
                            Virtual Dashboard
                        </h1>
                    </div>
                </div>
            </Disclosure>
        </>
    );
};

export default MobileNavigation;
