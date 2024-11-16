import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { hashPassword } from '../../../lib/auth';

export async function POST(request: Request) {
  try {
    const { resetToken, newPassword } = await request.json();

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: resetToken,
        passwordResetExpires: { gte: new Date() },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    return NextResponse.json({ message: "Password reset successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Password reset failed" }, { status: 500 });
  }
}
