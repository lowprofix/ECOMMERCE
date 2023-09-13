import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';
 
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { productId, categoryId, startTime, endTime } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!productId) {
      return new NextResponse("Product is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category is required", { status: 400 });
    }
    if (!startTime) {
      return new NextResponse("Start Time is required", { status: 400 });
    }
    if (!endTime) {
      return new NextResponse("End Time is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      }
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const availability = await prismadb.availability.create({
      data: {
        productId,
        categoryId,
        startTime,
        endTime,
      }
    });
  
    return NextResponse.json(availability);
  } catch (error) {
    console.log('[AVAILABILITIES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const availabilities = await prismadb.availability.findMany({
      where: {
        category: {
        name: "Services"
      }
      }
    });
  
    return NextResponse.json(availabilities);
  } catch (error) {
    console.log('[AVAILABILITIES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
