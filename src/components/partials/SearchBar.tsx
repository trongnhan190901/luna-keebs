import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';

const SearchBar = () => {
    const router = useRouter();

    return (
        <>
            <form
                action=""
                className="relative mx-auto w-full font-secondary font-bold"
            >
                <input
                    type="search"
                    id="searchInput"
                    className="relative z-10 h-16 w-14 cursor-pointer bg-transparent pl-12 text-white outline-none focus:w-full focus:cursor-text focus:border-b-2 focus:border-white focus:pl-16 focus:pr-4"
                />
                <MagnifyingGlassIcon className="absolute inset-y-0 h-16 w-16 border-r border-transparent stroke-white" />
            </form>
        </>
    );
};
export default SearchBar;
