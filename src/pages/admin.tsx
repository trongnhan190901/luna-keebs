/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable indent */

import type { NextPage } from 'next';
import AdminNavbar from '~/admin/AdminNavbar';

const Admin: NextPage = () => {
    return (
        <>
            <div className="full-size flex flex-col">
                <div className="flex ">
                    <AdminNavbar />
                </div>
            </div>
        </>
    );
};

export default Admin;
