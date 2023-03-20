/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import React from 'react';
import MainLayout from '~/components/layouts/MainLayout';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'jotai';
import { api } from '../utils/api';

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
            <SessionProvider session={session}>
                {getLayout(<Component {...pageProps} />)}
            </SessionProvider>
        </Provider>
    );
}

export default api.withTRPC(MyApp);
