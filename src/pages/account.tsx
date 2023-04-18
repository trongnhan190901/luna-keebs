/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useAtom } from 'jotai';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { logInState } from '~/atoms/modalAtom';
import Login from '~/components/modal/Login';
import PaymentContainer from '~/components/shared/PaymentContainer';
import TicketContainer from '~/components/shared/TicketContainer';

const Account: NextPage = () => {
    const { data: session, status } = useSession();

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
                    </div>
                    <h2 className="mx-10 flex h-36 w-full items-center font-secondary text-5xl font-bold">
                        Lịch sử đơn hàng
                    </h2>
                    <PaymentContainer />
                    <h2 className="mx-10 flex h-36 w-full items-center font-secondary text-5xl font-bold">
                        Yêu cầu hỗ trợ
                    </h2>
                    <TicketContainer />
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="absolute-center smooth-effect  full-size mt-52 flex-col font-secondary text-6xl font-bold">
                    Bạn chưa đăng nhập
                    <div
                        onClick={() => setIsLogin(!isLogin)}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    return {
        props: { session },
    };
};
