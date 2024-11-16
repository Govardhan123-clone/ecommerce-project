import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { comparePassword, generateToken } from '@/app/lib/auth';
//import { comparePassword, generateToken } from '../../../lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = generateToken(user.id);
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
