// app/api/auth/profile/route.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET as string;

export async function GET(req: Request) {
  try {
    // Get token from request using next-auth's getToken function
    const token = await getToken({ req, secret: SECRET });

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Retrieve user from database
    const user = await prisma.user.findUnique({
      where: {
        id: token.id, // Assuming token includes user's id
      },
      select: {
        id: true,
        email: true,
        name: true,
        // Include any other fields you want to return
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return user profile
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
