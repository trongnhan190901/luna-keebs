import { ReactNode } from 'react';
import Header from '~/components/partials/Header';
import Footer from '~/components/partials/Footer';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Header />
            <main className="min-h-screen overflow-y-hidden">{children}</main>
            <Footer />
        </>
    );
}
