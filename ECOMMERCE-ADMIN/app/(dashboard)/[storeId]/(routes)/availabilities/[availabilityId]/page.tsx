import prismadb from "@/lib/prismadb";

import { AvailabilityForm } from "./components/availability-form";

const AvailabilityPage = async ({
  params
}: {
  params: { availabilityId: string, storeId: string }
}) => {
  const availability = await prismadb.availability.findUnique({
    where: {
      id: params.availabilityId
    }
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
  });
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
  });

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AvailabilityForm categories={categories} products={products} initialData={availability} />
      </div>
    </div>
  );
}

export default AvailabilityPage;
