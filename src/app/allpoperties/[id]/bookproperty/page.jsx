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
    if (user.role != 'tenant') {
        return (
            <div>
                Only job seeker can apply....!!!
            </div>
        )
    }

    const property = await getPropertyById(id);
    console.log("property ", property);

    return (
        <div>
            <h2>Apply prperty</h2>
            <BookThisProperty tenant={user} property={property}></BookThisProperty>
        </div>
    );
};

export default BookPropertyPage;