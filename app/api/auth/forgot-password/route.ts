import { NextResponse } from 'next/server';
// import prisma from /../../lib/prisma';
import crypto from 'crypto';
import prisma from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { email },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires,
      },
    });

    // Send email to user with the resetToken (implement this in your frontend)
    return NextResponse.json({ message: "Password reset token sent" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send reset token" }, { status: 500 });
  }
}

 