import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma'; // Assuming you have a Prisma client instance set up

// Create a new product
export async function POST(req: Request) {
  try {
    const { name, description, price, imageUrl } = await req.json();
    
    // Validate input
    if (!name || !description || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl: imageUrl || '', // Default to an empty string if imageUrl is not provided
      },
    });
    
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get all products
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get a specific product by ID
export async function GET_BY_ID(req: Request) {
  const { id } = req.url.split('/').pop() as string; // Get ID from the URL
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update a product by ID
export async function PUT(req: Request) {
  const { id } = req.url.split('/').pop() as string; // Get ID from the URL
  const { name, description, price, imageUrl } = await req.json();

  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price,
        imageUrl,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Product not found or update failed' }, { status: 500 });
  }
}

// Delete a product by ID
export async function DELETE(req: Request) {
  const { id } = req.url.split('/').pop() as string; // Get ID from the URL
  try {
    const product = await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Product not found or deletion failed' }, { status: 500 });
  }
}
