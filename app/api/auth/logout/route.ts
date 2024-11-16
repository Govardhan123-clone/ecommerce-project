import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: "Logged out successfully" }, {
    headers: { 'Set-Cookie': 'token=; Path=/; HttpOnly; Max-Age=0' },
  });
}
