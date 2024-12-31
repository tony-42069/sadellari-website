import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://dsadellari:ha14hj7bUz7vGReO@cluster0.jvrbh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export async function POST(request: Request) {
  const client = new MongoClient(uri);
  
  try {
    const { email } = await request.json();

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    await client.connect();
    const database = client.db('sadellari_db');
    const collection = database.collection('email_waitlist');

    // Check if email already exists
    const existingEmail = await collection.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 400 }
      );
    }

    // Insert new email
    await collection.insertOne({
      email,
      createdAt: new Date()
    });

    return NextResponse.json(
      { success: true, message: 'Thank you for joining the waitlist!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist submission error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
