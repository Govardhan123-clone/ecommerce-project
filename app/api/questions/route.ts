// app/api/questions/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a question
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const question = await prisma.question.create({
      data: {
        title: data.title,
        content: data.content,
      },
    });
    return NextResponse.json(question);
  } catch (error) {
    console.error('Error creating question:', error);
    return NextResponse.json({ error: 'Error creating question' }, { status: 500 });
  }
}

// Get all questions
export async function GET() {
  try {
    const questions = await prisma.question.findMany();
    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json({ error: 'Error fetching questions' }, { status: 500 });
  }
}

// Update a question
export async function PATCH(req: Request) {
  try {
    const { id, title, content } = await req.json();
    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
    return NextResponse.json(updatedQuestion);
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json({ error: 'Error updating question' }, { status: 500 });
  }
}

// Delete a question
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.question.delete({
      where: { id },
    });
    return NextResponse.json({ message: 'Question deleted' });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json({ error: 'Error deleting question' }, { status: 500 });
  }
}
