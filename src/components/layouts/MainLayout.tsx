import { ReactNode } from 'react';
import Header from '~/components/partials/Header';
import Footer from '~/components/partials/Footer';

interface MainLayoutProps {
    children: ReactNode;
    // showHeader: boolean;
    // showFooter: boolean;
}

// const Header = dynamic(() => import('../partials/Header'));
// const Footer = dynamic(() => import('../partials/Footer'));

export default function MainLayout({
    children,
}: // showHeader,
// showFooter,
MainLayoutProps) {
    return (
        <>
            <Header />
            <main className="min-h-screen overflow-y-hidden">{children}</main>
            <Footer />
        </>
    );
}
