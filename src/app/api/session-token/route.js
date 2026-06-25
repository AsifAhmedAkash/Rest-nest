

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session?.session?.token) {
        return NextResponse.json({ token: null }, { status: 401 });
    }

    return NextResponse.json({ token: session.session.token });
}