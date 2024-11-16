import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { orders: true },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// GET a specific user by ID
export async function GET_BY_ID(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  
  if (!id) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: { orders: true },
    });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

// POST a new user
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email, name, password } = data;

    const newUser = await prisma.user.create({
      data: { email, name, password },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

// PUT to update a user
export async function PUT(request: Request) {
  const data = await request.json();
  const { id, email, name, password } = data;

  if (!id) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { email, name, password },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}

// DELETE a user by ID
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

  try {
    await prisma.user.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
