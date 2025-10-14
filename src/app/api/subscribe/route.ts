import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, phone, company } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    if (!firstName || typeof firstName !== 'string') {
      return NextResponse.json({ error: 'First name is required' }, { status: 400 });
    }
    if (!lastName || typeof lastName !== 'string') {
      return NextResponse.json({ error: 'Last name is required' }, { status: 400 });
    }

    const token = crypto.randomUUID();

    const subscription = {
      email,
      firstName,
      lastName,
      phone,
      company,
      token,
    };

    return NextResponse.json(subscription, { status: 200 });
  } catch (error) {
    console.error('Subscription API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
