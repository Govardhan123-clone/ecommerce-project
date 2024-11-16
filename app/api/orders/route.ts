import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

// GET all orders
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { user: true, products: true },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// GET a specific order by ID
export async function GET_BY_ID(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  
  if (!id) return NextResponse.json({ error: "Order ID is required" }, { status: 400 });

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: { user: true, products: true },
    });
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}

// POST a new order
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { userId, products } = data;

    const newOrder = await prisma.order.create({
      data: {
        userId,
        products: { connect: products.map((productId: number) => ({ id: productId })) },
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

// PUT to update an order
export async function PUT(request: Request) {
  const data = await request.json();
  const { id, products } = data;

  if (!id) return NextResponse.json({ error: "Order ID is required" }, { status: 400 });

  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { products: { set: products.map((productId: number) => ({ id: productId })) } },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

// DELETE an order by ID
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) return NextResponse.json({ error: "Order ID is required" }, { status: 400 });

  try {
    await prisma.order.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}
