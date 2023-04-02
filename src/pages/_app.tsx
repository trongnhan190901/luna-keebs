/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import MainLayout from '~/components/layouts/MainLayout';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'jotai';
import { api } from '../utils/api';
import CartContextProvider from '~/providers/CartContextProvider';

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

    return (
        <Provider>
            <CartContextProvider>
                <SessionProvider session={session}>
                    {getLayout(<Component {...pageProps} />)}
                </SessionProvider>
            </CartContextProvider>
        </Provider>
    );
}

export default api.withTRPC(MyApp);
