
import { getPropertyById } from '@/lib/api/property';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import BookThisProperty from './BookThisProperty';

const BookPropertyPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();

    if (!user) {
        redirect(`/auth/signin?redirect=/allpoperties/${id}/bookproperty`);
    }

    // console.log('user info', user);
    if (user.role !== 'tenant') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-800">
                <div className="p-6 rounded-xl border border-red-200 bg-red-50 shadow-md flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-500">error</span>
                    <p className="text-red-700 font-semibold">
                        Only tenants can book this property.
                    </p>
                </div>
            </div>
        );
    }


    const property = await getPropertyById(id);
    console.log("property ", property);

    return (
        <div className='p-4'>
            {/* <h2>Apply prperty</h2> */}
            <BookThisProperty tenant={user} property={property}></BookThisProperty>
        </div>
    );
};

export default BookPropertyPage;