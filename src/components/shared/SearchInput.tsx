import { memo } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchInput = () => {
    return (
        <>
            <div className="absolute-center full-size rounded-xl border-2 border-gray-500 bg-transparent ">
                <input
                    type="text"
                    placeholder="Bạn tìm sách gì thế ? 	(.❛ ᴗ ❛.)"
                    className="flex w-full bg-transparent pl-4 text-2xl outline-0"
                />
                <MagnifyingGlassIcon className="mx-4 h-12 w-12" />
            </div>
        </>
    );
};

export default memo(SearchInput);
