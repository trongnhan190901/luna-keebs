import { Product } from '@prisma/client';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useAtom } from 'jotai';
import { editProductState } from '~/atoms/modalAtom';
import Link from 'next/link';

interface AdminProductListProps {
    product: Product;
}

const AdminProductItem = ({ product }: AdminProductListProps) => {
    const [isOpen, setIsOpen] = useAtom(editProductState);

    return (
        <>
            <div className="absolute-center mx-auto h-24 w-[90%] items-center border-b-2 border-black px-8 font-secondary text-4xl">
                <div className="w-[50%] ">
                    <Link
                        href={'/product/' + product.slug}
                        className="hover:text-rose-500"
                    >
                        {product.title}
                    </Link>
                </div>
                <div className="absolute-center w-[25%]">{product.price}</div>
                <div className="absolute-center w-[25%]">
                    {product.quantity}
                </div>
                <div className="group flex w-[5%] justify-end">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        <Cog6ToothIcon className="h-12 w-12 group-hover:fill-gray-400 group-hover:stroke-black" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminProductItem;
