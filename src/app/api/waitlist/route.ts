import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();

  // Here you would typically:
  // 1. Validate the email
  // 2. Store it in your database or email service
  // 3. Return appropriate response

  // For now, we'll just log it and return success
  console.log('New waitlist signup:', email);
  
  return NextResponse.json({ success: true });
}
