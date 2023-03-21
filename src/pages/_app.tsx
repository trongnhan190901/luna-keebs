/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import MainLayout from '~/components/layouts/MainLayout';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'jotai';
import { api } from '../utils/api';
import { getCurrentUser } from '~/libs/getCurrentUser';
import { use } from 'react';
import { Role } from '@prisma/client';
import { db } from '~/libs/server/db';
import UserContextProvider from '~/providers/UserProvider';
import { TRPCProvider } from '~/providers/trpcProvider';
import CartContextProvider from '~/providers/CartContextProvider';
import React from 'react';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
    const getLayout =
        Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

    const user = use(getCurrentUser());

    let isAdmin = false;
    if (user) {
        isAdmin =
            use(
                db.user.findFirst({
                    where: {
                        id: user.id,
                    },
                    select: {
                        role: true,
                    },
                }),
            )?.role === Role.Admin;
    }
    return (
        <Provider>
            {/* <TRPCProvider>
                <CartContextProvider> */}
            <SessionProvider session={session}>
                <UserContextProvider user={user} isAdmin={isAdmin}>
                    {getLayout(<Component {...pageProps} />)}
                </UserContextProvider>
            </SessionProvider>
            {/* </CartContextProvider>
            </TRPCProvider> */}
        </Provider>
    );
}

export default api.withTRPC(MyApp);
