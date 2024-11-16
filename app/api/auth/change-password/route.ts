import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { comparePassword, hashPassword, verifyToken } from '@/app/lib/auth';
//import { hashPassword, comparePassword, verifyToken } from '';

export async function POST(request: Request) {
  try {
    const { oldPassword, newPassword, token } = await request.json();
    const payload: any = verifyToken(token);

    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user || !(await comparePassword(oldPassword, user.password))) {
      return NextResponse.json({ error: "Incorrect old password" }, { status: 401 });
    }

    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: payload.userId },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Password update failed" }, { status: 500 });
  }
}
