import { useAtom } from 'jotai';
import { NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { newAddressState, logInState } from '~/atoms/modalAtom';
import Login from '~/components/partials/Login';
import AddNewAddress from '~/features/AddNewAddress';

const Account: NextPage = () => {
    const { data: session, status } = useSession();

    const [newAddressOpen, setNewAddressOpen] = useAtom(newAddressState);
    const [isLogin, setIsLogin] = useAtom(logInState);

    if (status === 'authenticated') {
        return (
            <>
                <div className="absolute-center my-4 mt-28 font-secondary text-7xl font-bold">
                    Tài khoản của tôi
                </div>
                <div className="mx-auto flex h-full w-[90%] flex-col">
                    <h2 className="mx-10 flex h-36 w-full items-center font-secondary text-5xl font-bold">
                        Thông tin tài khoản
                    </h2>
                    <div className="absolute-center full-size flex=col flex-col">
                        <div className="absolute-center w-full flex-col">
                            <div
                                className="absolute-center mx-20 h-48 w-48 rounded-full bg-contain bg-center"
                                style={{
                                    backgroundImage: `url(${
                                        session?.user?.image
                                            ? session?.user?.image
                                            : ''
                                    })`,
                                }}
                            ></div>
                            <span className="absolute-center h-24 font-primary text-4xl font-bold">
                                {session?.user?.name}
                            </span>
                        </div>
                        <div className="full-size flex flex-col px-10">
                            <div className="flex h-32 items-center  font-secondary text-3xl font-bold">
                                Sổ địa chỉ
                            </div>
                            <button
                                onClick={() =>
                                    setNewAddressOpen(!newAddressOpen)
                                }
                                className="absolute-center h-20 w-64 rounded-3xl border-2 border-black hover:bg-black hover:text-white"
                            >
                                <span className="absolute-center mx-2 font-secondary text-3xl font-bold">
                                    Thêm địa chỉ
                                </span>
                                <AddNewAddress />
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="absolute-center smooth-effect  full-size mt-52 flex-col font-secondary text-6xl font-bold">
                    Bạn chưa đăng nhập
                    <div
                        onClick={() => setIsLogin(true)}
                        className="absolute-center smooth-effect  mx-2 mt-16 h-20 w-64 rounded-3xl border-2 border-black font-secondary text-3xl font-bold hover:bg-black hover:text-white"
                    >
                        Đăng nhập
                    </div>
                    <Login />
                </div>
            </>
        );
    }
};

export default Account;

export const getSetverSideProps = async (context: any) => {
    const session = await getSession(context);

    return {
        props: { session },
    };
};
