import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { availabilityId: string } }
) {
  try {
    if (!params.availabilityId) {
      return new NextResponse("Availability id is required", { status: 400 });
    }

    const availability = await prismadb.availability.findUnique({
      where: {
        id: params.availabilityId
      }
    });
  
    return NextResponse.json(availability);
  } catch (error) {
    console.log('[AVAILABILITY_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  { params }: { params: { availabilityId: string, storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.availabilityId) {
      return new NextResponse("Availability id is required", { status: 400 });
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

    const availability = await prismadb.availability.delete({
      where: {
        id: params.availabilityId,
      }
    });
  
    return NextResponse.json(availability);
  } catch (error) {
    console.log('[AVAILABILITY_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  { params }: { params: { availabilityId: string, storeId: string } }
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
      return new NextResponse("Start time is required", { status: 400 });
    }
    if (!endTime) {
      return new NextResponse("End time is required", { status: 400 });
    }

    if (!params.availabilityId) {
      return new NextResponse("availability id is required", { status: 400 });
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

    const availability = await prismadb.availability.update({
      where: {
        id: params.availabilityId,
      },
      data: {
        productId,
        categoryId,
        startTime,
        endTime,
      }
    });
  
    return NextResponse.json(availability);
  } catch (error) {
    console.log('[AVAILABILITY_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
