import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { AvailabilityColumn } from "./components/columns"
import { AvailabilityClient } from "./components/client";


const AvailabilitiesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const availabilities = await prismadb.availability.findMany({
    where: {
      category: {
        name: "Services"
      }
    },
    include: {
      product: true,
      category: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedAvailabilities: AvailabilityColumn[] = availabilities.map((item) => ({
    id: item.id,
    startTime: format(item.startTime, 'MMMM do, yyyy'),
    endTime: format(item.endTime, 'MMMM do, yyyy'),
    product: item.product.name,
    category: item.category.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
    updatedAt: format(item.updatedAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AvailabilityClient data={formattedAvailabilities} />
      </div>
    </div>
  );
};

export default AvailabilitiesPage;
