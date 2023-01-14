import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import React from 'react';
import MainLayout from '~/components/layouts/MainLayout';
import { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout =
        Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);
    return <>{getLayout(<Component {...pageProps} />)}</>;
}

export default MyApp;
