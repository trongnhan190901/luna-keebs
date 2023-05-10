import type { NextPage } from 'next';
import UserContainer from '~/components/shared/UserContainer';

const Account: NextPage = () => {
    return (
        <>
            <div className="full-size flex flex-col">
                <div className="flex ">
                    <UserContainer />
                </div>
            </div>
        </>
    );
};

export default Account;
