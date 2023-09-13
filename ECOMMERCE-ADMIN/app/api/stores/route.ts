import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, logoUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
        logoUrl,
      }
    });

    console.log('[STORES_POST]', store)

  
    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function GET(
  req: Request,
  { params }: { params: { storeId: string }}
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }


    const store = await prismadb.store.findMany({
      where: {
        id: params.storeId,
      },
    });
  
    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
