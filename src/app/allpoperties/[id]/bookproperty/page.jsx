import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const BookPropertyPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();

    if (!user) {
        redirect(`/auth/signin?redirect=/allpoperties/${id}/bookproperty`);
    }

    return (
        <div>
            <h2>Apply prperty</h2>
        </div>
    );
};

export default BookPropertyPage;