import Link from 'next/link';

interface ButtonProps {
    href: string;
}
const ButtonRedirect = ({ href }: ButtonProps) => {
    return (
        <>
            <Link href={href}>
                <button className="absolute-center my-8 h-[45px] w-56 overflow-hidden rounded-xl border-2 border-white font-secondary text-[1.625rem] font-medium text-white hover:bg-white hover:text-black">
                    Mua ngay
                </button>
            </Link>
        </>
    );
};

export default ButtonRedirect;
