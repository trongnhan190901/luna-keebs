import type { NextPage } from 'next';
import Head from 'next/head';
import Slider from '~/components/shared/Slider';
import Category from '~/components/shared/Category';
import Suggest from '~/components/shared/Suggest';
import NewArrival from '~/components/shared/NewArrival';
const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Luna Keebs</title>
            </Head>
            <div className="smooth-effect flex h-fit min-h-screen flex-col bg-[#EFEBE4]">
                <div className="absolute-center w-full">
                    <Slider />
                </div>
                <div className="absolute-center h-full">
                    <NewArrival />
                </div>
                <div className="absolute-center h-full">
                    <Category />
                </div>
                <div className="h-full min-h-screen">
                    <Suggest />
                </div>
            </div>
        </>
    );
};

export default Home;
